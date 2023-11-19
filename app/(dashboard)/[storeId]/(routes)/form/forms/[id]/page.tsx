import { GetFormById, GetFormWithSubmissions } from '@/actions/form';
import { StatsCard } from '@/app/(dashboard)/[storeId]/(routes)/form/page';
import {
  ElementsType,
  FormElementInstance,
} from '@/components/(form)/FormElements';
import LinkShareButton from '@/components/(form)/LinkShareButton';
import SubmitButton from '@/components/(form)/SubmitButton';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format, formatDistance } from 'date-fns';
import { ArrowUpRight, CheckSquare, Eye, MousePointer2 } from 'lucide-react';

const FormDetailPage = async ({
  params,
}: {
  params: { id: string; storeId: string };
}) => {
  const { id, storeId } = params;
  const form = await GetFormById(id);
  if (!form) {
    throw new Error('form not found');
  }

  const { visits, submissions } = form;
  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  return (
    <>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
        <StatsCard
          title="Total visits"
          icon={<Eye className="text-blue-600" />}
          helperText="All time for visits"
          value={visits.toLocaleString() ?? ''}
          loading={false}
          className="shadow-md shadow-blue-600"
        />
        <StatsCard
          title="Total submissions"
          icon={<CheckSquare className="text-yellow-600" />}
          helperText="All time for submissions"
          value={submissions.toLocaleString() ?? ''}
          loading={false}
          className="shadow-md shadow-yellow-600"
        />
        <StatsCard
          title="Submission rate"
          icon={<MousePointer2 className="text-green-600" />}
          helperText="All time for submissions"
          value={submissionRate.toLocaleString() + '%' ?? ''}
          loading={false}
          className="shadow-md shadow-green-600"
        />

        <StatsCard
          title="Bounce rate"
          icon={<ArrowUpRight className="text-red-600" />}
          helperText="Visits that leaves without interacting"
          value={submissionRate.toLocaleString() + '%' ?? ''}
          loading={false}
          className="shadow-md shadow-red-600"
        />
      </div>
      <div className="h-screen overflow-y-auto scrollbar-hidden container pt-10">
        <SubmissionsTable
          id={form.id}
          storeId={storeId}
        />
      </div>
    </>
  );
};
export default FormDetailPage;

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

async function SubmissionsTable({
  id,
  storeId,
}: {
  id: string;
  storeId: string;
}) {
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

interface RowCellProps {
  value: string;
  type: ElementsType;
}
function RowCell({ type, value }: RowCellProps) {
  let node: React.ReactNode = value;
  switch (type) {
    case 'DateField':
      if (!value) break;
      const date = new Date(value);
      node = <Badge variant={'outline'}>{format(date, 'dd/MM/yyyy')}</Badge>;
      break;
    case 'CheckboxField':
      const checked = value === 'true';
      node = (
        <Checkbox
          checked={checked}
          disabled
        />
      );
      break;
  }
  return <TableCell>{node}</TableCell>;
}
