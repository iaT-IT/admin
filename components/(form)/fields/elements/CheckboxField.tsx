'use client';

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from '@/components/(form)/FormElements';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import useDesigner from '@/hooks/useDesigner';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ErrorOption, FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';

const type: ElementsType = 'CheckboxField';
const extraAttributes = {
  label: 'Checkbox Field',
  helperText: 'Helper text',
  required: false,
  placeholder: 'Choose your option here',
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

export const CheckboxFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: CheckSquare,
    label: 'CheckBox',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementInstance,
    currentValue: string,
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue === 'true';
    }
    return true;
  },
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const id = `checkbox-${element.id}`;
  const { label, required, placeholder, helperText } = element.extraAttributes;
  return (
    <div className="flex items-start space-x-2">
      {/*    <Checkbox id={id} /> */}
      <div className="flex flex-col gap-2">
        <Label htmlFor={id}>
          {label}
          {required && '*'}
        </Label>
        <Input
          readOnly
          disabled
          placeholder={placeholder}
        />
        {helperText && (
          <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
        )}
      </div>
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
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);
  async function applyChanges(values: propertiesFormSchemaType) {
    const { label, helperText, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
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
          name="label"
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
              <FormDescription>
                The label of the field
                <br />
                It will be displayed above the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helper text</FormLabel>
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
              <FormDescription>
                The helper text of the field
                <br />
                It will be displayed above the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Required</FormLabel>

                <FormDescription>
                  The required of the field
                  <br />
                  It will be displayed above the field
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue === 'true' ? true : false);
  console.log('❄️ ~ file: CheckboxField.tsx:238 ~ value:', value);
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);
  const element = elementInstance as CustomInstance;
  const { label, required, helperText } = element.extraAttributes;
  const id = `checkbox-${element.id}`;

  return (
    <div className="flex items-start space-x-2">
      <Checkbox
        id={id}
        defaultChecked={value}
        className={cn(error && 'border-red-500')}
        onCheckedChange={(checked) => {
          let value = true;
          if (checked === true) value = false;
          setValue(value);
          if (!submitValue) return;
          const stringValue = value ? 'true' : 'false';
          const valid = CheckboxFieldFormElement.validate(element, stringValue);
          setError(!valid);
          submitValue(element.id, stringValue);
        }}
      />
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor={id}
          className={cn(error && 'text-red-500 ')}
        >
          {label}
          {required && '*'}
        </Label>

        {helperText && (
          <p
            className={cn(
              'text-muted-foreground text-[0.8rem]',
              error && 'text-red-500',
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
}
