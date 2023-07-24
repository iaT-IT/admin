import { MainNav } from './main-nav';
import StoreSwitcher from './store-switcher';
import { ThemeToggle } from './theme-toggle';
import prismadb from '@/lib/prismadb';
import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Navbar = async () => {
   const userId = 'user_2SWjMgKpl1DFk3Srh9QIgpmRvfp';
   if (!userId) redirect('/sign-in');
   const stores = await prismadb.store.findMany({
      where: {
         userId,
      },
   });
   return (
      <div className="border-b">
         <div className="flex h-16 items-center px-4">
            <StoreSwitcher items={stores} />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
               <ThemeToggle />
               <UserButton afterSignOutUrl="/" />
            </div>
         </div>
      </div>
   );
};
export default Navbar;
