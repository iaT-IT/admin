import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
   try {
      const userId = 'user_2SWjMgKpl1DFk3Srh9QIgpmRvfp';
      const body = await req.json();
      const { name } = body;

      if (!userId) return new NextResponse('Unauthorized', { status: 401 });
      if (!name) return new NextResponse('NAme is required', { status: 400 });
      const store = await prismadb.store.create({
         data: {
            name,
            userId,
         },
      });
      return NextResponse.json(store);
   } catch (error) {
      console.log(`[STORES_POST]`, error);
      return new NextResponse('Internal error', { status: 500 });
   }
}
