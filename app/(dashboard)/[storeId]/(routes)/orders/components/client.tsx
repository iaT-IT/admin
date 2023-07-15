'use client';

import { OrderColumn, columns } from './columns';
import { ApiList } from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Billboard } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

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
