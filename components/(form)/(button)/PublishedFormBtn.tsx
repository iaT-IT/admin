'use client';

import { PublishForm } from '@/actions/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import useDesigner from '@/hooks/useDesigner';
import { ArrowUpFromLine, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

const PublishedFormBtn = ({ id }: { id: string }) => {
  const { elements } = useDesigner();
  const router = useRouter();
  const [loading, startTransition] = useTransition();

  const publishForm = async () => {
    try {
      const jsonElement = JSON.stringify(elements);
      await PublishForm(id, jsonElement);
      toast.success('Your form is now available to the public');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <ArrowUpFromLine className="w-4 h-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form.
            <br />
            <br />
            <span className="font-medium">
              By publishing this form you will not available to the public and
              you will be able to collect submissions
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Proceed &nbsp; {loading && <Loader2 className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default PublishedFormBtn;
