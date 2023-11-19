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
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import useDesigner from '@/hooks/useDesigner';
import { zodResolver } from '@hookform/resolvers/zod';
import { SeparatorHorizontal } from 'lucide-react';
import { useEffect } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';

const type: ElementsType = 'SpacerField';
const extraAttributes = {
  height: 20, //px
};

const propertiesSchema = z.object({
  height: z.number().min(5).max(200),
});

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: SeparatorHorizontal,
    label: 'Spacer',
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
  const { height } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <Label className="text-muted-foreground">Spacer field: {height}px</Label>
      <SeparatorHorizontal className="w-8 h-8" />
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
      height: element.extraAttributes.height,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);
  function applyChanges(values: propertiesFormSchemaType) {
    const { height } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        height,
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
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (px): {form.watch('height')}</FormLabel>
              <FormControl className="pt-2">
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  onValueChange={(value) => {
                    console.log(value);
                    field.onChange(value[0]);
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
  const { height } = element.extraAttributes;
  return <div style={{ height, width: '100%' }}></div>;
}
