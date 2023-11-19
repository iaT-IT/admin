'use client';

import { SubmitForm } from '@/actions/form';
import {
  FormElementInstance,
  FormElements,
} from '@/components/(form)/FormElements';
import { Button } from '@/components/ui/button';
import { Loader, MousePointer2 } from 'lucide-react';
import { useCallback, useRef, useState, useTransition } from 'react';
import toast from 'react-hot-toast';

interface FormSubmitProps {
  formUrl: string;
  content: FormElementInstance[];
  name: string;
}
const FormSubmit: React.FC<FormSubmitProps> = ({ content, formUrl, name }) => {
  const formValues = useRef<Record<string, string>>({});
  const formErrors = useRef<Record<string, boolean>>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();
  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || '';
      const valid = FormElements[field.type].validate(field, actualValue);
      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }
    if (Object.keys(formErrors.current).length > 0) return false;
    return true;
  }, [content]);
  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };
  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      /* trick to re-render */
      setRenderKey(new Date().getTime());
      toast.error('please check the form for errors');
      return;
    }
    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast.error('please check the form for errors');
    }
  };
  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-green-700 rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex items-center justify-center max-h-screen overflow-y-auto scrollbar-hidden py-20">
      <div
        key={renderKey}
        className="max-w-2xl flex flex-col gap-4 flex-grow bg-background  p-8  border shadow-xl shadow-green-500 rounded mt-10"
      >
        <h2 className="w-full text-center text-3xl">{name}</h2>
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8"
          onClick={() => startTransition(submitForm)}
          disabled={pending}
        >
          {!pending && (
            <>
              <MousePointer2 className="mr-2" />
              Submit
            </>
          )}
          {pending && (
            <>
              <Loader className="animate-spin" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
export default FormSubmit;
