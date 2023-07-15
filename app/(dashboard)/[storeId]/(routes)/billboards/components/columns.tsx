'use client';

import { CellAction } from './cell-action';
import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
   id: string;
   label: string;
   createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
   {
      accessorKey: 'label',
      header: 'Label',
   },
   {
      accessorKey: 'createdAt',
      header: 'Data',
   },
   {
      id: 'actions',
      cell: ({ row }) => <CellAction data={row.original} />,
   },
];
