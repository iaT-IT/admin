'use client';

import { OrderColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface OrderClientProps {
   data: OrderColumn[];
}
export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
   return (
      <>
         <Heading
            title={`Orders (${data.length})`}
            description="Manage billboards for your store"
         />

         <Separator />
         <DataTable
            columns={columns}
            data={data}
            searchKey="products"
         />
      </>
   );
};
