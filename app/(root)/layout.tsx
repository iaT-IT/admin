import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function SetupLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const userId = 'user_2SWjMgKpl1DFk3Srh9QIgpmRvfp';
   if (!userId) {
      redirect('/sign-in');
   }
   const store = await prismadb.store.findFirst({
      where: {
         userId,
      },
   });
   if (store) redirect(`${store.id}`);
   return <>{children}</>;
}
