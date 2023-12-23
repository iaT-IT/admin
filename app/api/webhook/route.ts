import prismadb from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { buffer } from 'stream/consumers';
import Stripe from 'stripe';

export async function POST(req: Request) {
try {
  const body = await buffer(req.body as any);
  const signature = req.headers.get('stripe-signature') as string;
  if (!signature) {
    return new NextResponse(`No Stripe Signature found`, {
      status: 401,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];
  console.log(event.type)
  const addressString = addressComponents.filter((c) => c !== null).join(', ');

  if (event.type === 'checkout.session.completed') {
    console.log("paid")
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || '',
      },
      include: {
        orderItems: true,
      },
    });

    const productIds = order.orderItems.map((orderItem) => orderItem.productId);

    await prismadb.product.updateMany({
      where: {
        id: {
          in: [...productIds],
        },
      },
      data: {
        isArchived: true,
      },
    });
  }
  return new NextResponse(null, { status: 200 });

} catch (error) {
    console.log(error)
}

}
