import { GetFormStats, GetForms } from '@/actions/form';
import CreateFormButton from '@/components/CreateFormButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Form } from '@prisma/client';
import { formatDistance } from 'date-fns';
import {
  ArrowUpRight,
  CheckSquare,
  Eye,
  MousePointer2,
  MoveRight,
  Pencil,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, Suspense } from 'react';

interface FormPageProps {
  params: {
    id: string;
    storeId: string;
  };
}
const FormPage: React.FC<FormPageProps> = ({ params: { id, storeId } }) => {
  return (
    <div className="container pt-4 h-screen overflow-y-auto scrollbar-hidden">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <div className="flex justify-between items-center">
        {' '}
        <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
        <CreateFormButton storeId={storeId} />
      </div>
      <Separator className="my-6" />
      <div className="pb-40 flex flex-col gap-5">
        {' '}
        {/*          */}
        <Suspense
          fallback={Array.from({ length: 4 }).map((_, idx) => (
            <FormCardsSkeleton key={idx} />
          ))}
        >
          <FormCards storeId={storeId} />
        </Suspense>
      </div>
    </div>
  );
};

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  console.log('❄️ ~ file: page.tsx:59 ~ stats:', stats);
  return (
    <StatsCards
      loading={false}
      data={stats}
    />
  );
}
interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCards({ data, loading }: StatsCardsProps) {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<Eye className="text-blue-600" />}
        helperText="All time for visits"
        value={data?.visits.toLocaleString() ?? ''}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Total submissions"
        icon={
          <CheckSquare className="text-yellow-600 w-[1.15rem] aspect-square" />
        }
        helperText="All time for submissions"
        value={data?.submissions.toLocaleString() ?? ''}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
      <StatsCard
        title="Submission rate"
        icon={<MousePointer2 className="text-green-600" />}
        helperText="All time for submissions"
        value={data?.submissionRate.toLocaleString() + '%' ?? ''}
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="Bounce rate"
        icon={<ArrowUpRight className="text-red-600" />}
        helperText="Visits that leaves without interacting"
        value={data?.submissionRate.toLocaleString() + '%' ?? ''}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  helperText: string;
  value: string;
  loading: boolean;
  className: string;
}

export function StatsCard({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}

function FormCardsSkeleton() {
  return <Skeleton className="border-2 border-primary/20 h-[190px] w-full" />;
}

async function FormCards({ storeId }: { storeId: string }) {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard
          storeId={storeId}
          key={form.id}
          form={form}
        />
      ))}
    </>
  );
}

function FormCard({ form, storeId }: { form: Form; storeId: string }) {
  console.log('❄️ ~ file: page.tsx:174 ~ form:', form);
  return (
    <div className="max-w-[70%] flex items-start justify-between px-5 border border-slate-500 rounded-md py-3">
      <div className="flex flex-row gap-3 items-center px-3 py-5">
        <div className="p-0 self-start">
          <Image
            src={'/form.png'}
            alt=""
            width={80}
            height={80}
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 p-0">
          <div>{form.name}</div>
          <p>{form.description}</p>
          <p>
            {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
          </p>
        </div>
      </div>

      <div className=" flex flex-col  gap-3 p-0">
        <div className="flex flex-col gap-3">
          <div className="self-end">
            {form.published && (
              <Badge
                className="bg-green-500 text-white"
                variant={'outline'}
              >
                Published
              </Badge>
            )}
            {!form.published && (
              <Badge
                variant={'outline'}
                className="bg-red-500"
              >
                Draft
              </Badge>
            )}
          </div>
          <div className="self-end">
            <span className="flex items-center gap-3">
              <Eye
                className={cn(
                  form.published ? 'text-green-500 ' : 'text-slate-600',
                )}
              />
              <span className={cn(form.published ? '' : 'text-slate-600')}>
                {form.visits.toLocaleString()}
              </span>
              <CheckSquare
                className={cn(
                  'w-5 h-5',
                  form.published ? 'text-rose-500 ' : 'text-slate-600',
                )}
              />
              <span className={cn(form.published ? '' : 'text-slate-600')}>
                {form.submissions.toLocaleString()}
              </span>
            </span>
          </div>
        </div>
        <div>
          {form.published && (
            <Button
              asChild
              className=" w-full mt-2 text-sm gap-4"
            >
              <Link href={`/${storeId}/form/forms/${form.id}`}>
                {' '}
                View submissions
                <MoveRight />
              </Link>
            </Button>
          )}
          {!form.published && (
            <Button
              variant={'secondary'}
              asChild
              className=" w-full mt-2 text-sm gap-4   "
            >
              <Link href={`/${storeId}/form/builder/${form.id}`}>
                {' '}
                Edit form
                <Pencil />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
export default FormPage;
