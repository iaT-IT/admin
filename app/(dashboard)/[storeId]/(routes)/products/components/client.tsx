'use client';

import { ProductColumn, columns } from './columns';
import { ApiList } from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Billboard } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface ProductClientProps {
   data: ProductColumn[];
}
export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
   const router = useRouter();
   const params = useParams();
   return (
      <>
         <div className="fle items-center justify-between">
            <Heading
               title={`Products (${data.length})`}
               description="Manage products for your store"
            />
            <Button
               onClick={() => router.push(`/${params.storeId}/products/new`)}
            >
               <Plus className="mr-2 h-4 w-4" />
               Add New
            </Button>
         </div>
         <Separator />
         <DataTable
            columns={columns}
            data={data}
            searchKey="name"
         />
         <Heading
            title="API"
            description="API calls for Products"
         />
         <Separator />
         <ApiList
            entityName="products"
            entityIdName="productId"
         />
      </>
   );
};
