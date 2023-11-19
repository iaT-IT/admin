'use client';

import { UpdateFormContent } from '@/actions/form';
import { Button } from '@/components/ui/button';
import useDesigner from '@/hooks/useDesigner';
import { Loader2, Save } from 'lucide-react';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

const SaveFormBtn = ({ id }: { id: string }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();
  const updateFormContent = async () => {
    try {
      const jsonElement = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElement);
      toast.success('Your form has been saved');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Button
      variant={'outline'}
      className="gap-2"
      disabled={loading}
      onClick={() => startTransition(updateFormContent)}
    >
      <Save className="h-4 w-4" />
      Save
      {loading && <Loader2 className="animate-spin" />}
    </Button>
  );
};
export default SaveFormBtn;
