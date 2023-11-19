import { GetFormWithSubmissions } from '@/actions/form';
import {
  ElementsType,
  FormElementInstance,
} from '@/components/(form)/FormElements';
import SubmitButton from '@/components/(form)/SubmitButton';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDistance } from 'date-fns';
import { Row, RowCell } from './page';

export async function SubmissionsTable({ id }: { id: number }) {
  const form = await GetFormWithSubmissions(id);
  if (!form) {
    throw new Error('Form not found');
  }

  const formElement = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElement.forEach((element) => {
    switch (element.type) {
      case 'TextField':
      case 'CheckboxField':
      case 'TextAreaField':
      case 'NumberField':
      case 'DateField':
      case 'SelectField':
      case 'TextField':
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({ ...content, submittedAt: submission.createdAt });
  });

  return (
    <>
      <Separator className="my-6" />
      <div className="flex justify-between items-center">
        {' '}
        <h2 className="text-4xl font-bold col-span-2">Submissions</h2>
        <div className="flex gap-5">
          <SubmitButton shareURL={form.shareURL} />
          <LinkShareButton shareURL={form.shareURL} />
        </div>
      </div>
      <Separator className="my-6" />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className="uppercase"
                >
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
