'use client';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '@/components/(form)/FormElements';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useDesigner from '@/hooks/useDesigner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heading } from 'lucide-react';
import { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import { z } from 'zod';

const type: ElementsType = 'SubtitleField';
const extraAttributes = {
  title: 'SubTitle',
};

const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
});

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const SubTitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: Heading,
    label: 'Subtitle',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Title field</Label>
      <p className="text-lg">{title}</p>
    </div>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { updateElement } = useDesigner();
  const element = elementInstance as CustomInstance;
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      title: element.extraAttributes.title,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);
  function applyChanges(values: propertiesFormSchemaType) {
    const { title } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        title,
      },
    });
  }
  const onInvalid = (errors: FieldErrors) => console.error(errors);
  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges, onInvalid)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;
  return <p className="text-lg">{title}</p>;
}
