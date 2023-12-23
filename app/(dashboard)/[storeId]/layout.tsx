import Navbar from '@/components/navbar';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const userId = process.env.NEXT_PUBLIC_USER_ID;
  if (!userId) redirect('/sign-in');

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  console.log(store);
  if (!store) redirect('/');
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
}
