import { CheckboxFieldFormElement } from '@/components/(form)/fields/elements/CheckboxField';
import { DateFieldFormElement } from '@/components/(form)/fields/elements/DateField';
import { NumberFieldFormElement } from '@/components/(form)/fields/elements/NumberField';
import { SelectFieldFormElement } from '@/components/(form)/fields/elements/SelectField';
import { TextAreaFieldFormElement } from '@/components/(form)/fields/elements/TextAreaField';
import { TextFieldFormElement } from '@/components/(form)/fields/elements/TextField';
import { SeparatorFieldFormElement } from '@/components/(form)/fields/layout/SeparatorField';
import { SpacerFieldFormElement } from '@/components/(form)/fields/layout/SpacerField';
import { SubTitleFieldFormElement } from '@/components/(form)/fields/layout/SubTitleField';
import { TitleFieldFormElement } from '@/components/(form)/fields/layout/TitleField';
import { Icon } from 'lucide-react';

export type SubmitFunction = (key: string, value: string) => void;
export type ElementsType =
  | 'TextField'
  | 'TitleField'
  | 'SubtitleField'
  | 'SeparatorField'
  | 'SpacerField'
  | 'NumberField'
  | 'TextAreaField'
  | 'DateField'
  | 'SelectField'
  | 'CheckboxField';
export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtnElement: {
    icon: Icon;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: (key: string, value: string) => void;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};
export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubtitleField: SubTitleFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};
