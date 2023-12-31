import { SizeForm } from './components/size-form';
import prismadb from '@/lib/prismadb';

const CategoryPage = async ({
   params,
}: {
   params: { sizeId: string; storeId: string };
}) => {
   const size = await prismadb.size.findUnique({
      where: {
         id: params.sizeId,
      },
   });

   return (
      <div className="flex-col overflow-y-auto h-screen pb-20 scrollbar-hidden">
         <div className="flex-1 space-y-4 p-8 pt-6">
            <SizeForm initialData={size} />
         </div>
      </div>
   );
};
export default CategoryPage;
