'use client';

import { CellAction } from './cell-action';
import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
   id: string;
   name: string;
   billboardLabel: string;
   quantity: number;
   createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
   {
      accessorKey: 'name',
      header: 'Name',
   },
   {
      accessorKey: 'billboard',
      header: 'Billboard',
      cell: ({ row }) => {
         console.log('🚀 ~ row:', row);
         return row.original.billboardLabel;
      },
   },
   {
      accessorKey: 'quantity',
      header: 'Quantity',
   },
   { accessorKey: 'createdAt', header: 'Date' },
   {
      id: 'actions',
      cell: ({ row }) => <CellAction data={row.original} />,
   },
];
