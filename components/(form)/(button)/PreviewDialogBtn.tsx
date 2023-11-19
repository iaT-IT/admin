'use client';

import { FormElements } from '@/components/(form)/FormElements';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import useDesigner from '@/hooks/useDesigner';
import { Form } from '@prisma/client';
import { GanttChart } from 'lucide-react';

const PreviewDialogBtn = ({ form }: { form: Form }) => {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={'outline'}
          className="gap-2"
        >
          <GanttChart className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-3 p-4 h-screen overflow-y-auto scrollbar-hidden">
        {/* Title */}
        <div className="px-4 py-2 border-b border-slate-500 ">
          <p className="text-lg font-bold dark:text-white">Form Preview</p>
          <p className="text-sm ">
            This is how your form will look like to your users.
          </p>
        </div>
        {/* Contents */}
        <div className="flex flex-col gap-3">
          <h2 className="w-full text-center">{form.name}</h2>
          {elements.map((element) => {
            const FormComponent = FormElements[element.type].formComponent;
            return (
              <FormComponent
                key={element.id}
                elementInstance={element}
              />
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default PreviewDialogBtn;
