'use client';

import PreviewDialogBtn from '@/components/(form)/(button)/PreviewDialogBtn';
import PublishedFormBtn from '@/components/(form)/(button)/PublishedFormBtn';
import SaveFormBtn from '@/components/(form)/(button)/SaveFormBtn';
import Designer from '@/components/(form)/(designer)/Designer';
import DragOverlayWrapper from '@/components/(form)/(overlay)/DragOverlayWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DndProvider from '@/providers/dnd-provider';
import { Form } from '@prisma/client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import toast from 'react-hot-toast';

const FormBuilder = ({ form, storeId }: { form: Form; storeId: string }) => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) return null;
  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;
  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
        />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10 ">
              Form Published
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              Anyone with the link can view and submit the form
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input
                readOnly
                className="w-full"
                value={shareUrl}
              />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast.success('Link copied to clipboard');
                }}
              >
                Copy Link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button
                variant={'link'}
                asChild
              >
                <Link
                  href={'/'}
                  className="gap-2"
                >
                  <ArrowLeft />
                  Go back home
                </Link>
              </Button>
              <Button
                variant={'link'}
                asChild
              >
                <Link
                  href={`/${storeId}/form/forms/${form.id}`}
                  className="gap-2"
                >
                  Form detail
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndProvider form={form}>
      <main className="flex w-full gap-3 px-3 overflow-hidden">
        <div className="flex flex-col gap-3 border border-slate-500 rounded-md h-fit">
          <div className="flex items-center gap-2 border-b border-b-slate-500   p-4">
            <PreviewDialogBtn form={form} />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishedFormBtn id={form.id} />
              </>
            )}
          </div>
          <div className="flex flex-col gap-3 justify-start   p-4">
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">Form:</span>
              {form.name}
            </h2>
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">Id:</span>
              {form.id}
            </h2>
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">Name :</span>
              {form.name}
            </h2>
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">Description:</span>
              {form.description}
            </h2>
          </div>
        </div>
        <div className="flex-1 flex-grow items-center justify-center relative ">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndProvider>
  );
};

export default FormBuilder;
