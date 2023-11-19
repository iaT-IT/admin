import { FormElements } from '@/components/(form)/FormElements';
import SidebarBtnElement from '@/components/(form)/SidebarBtnElement';
import { Separator } from '@/components/ui/separator';

const SidebarElements = () => {
  return (
    <div>
      <p className="text-sm text-foreground/70">Pick your component</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-foreground col-span-1 md:col-span-2 place-self-start my-2">
          Layout components
        </p>

        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubtitleField} />

        <SidebarBtnElement formElement={FormElements.SeparatorField} />
        <SidebarBtnElement formElement={FormElements.SpacerField} />
        <p className="text-sm text-foreground col-span-1 md:col-span-2 place-self-start my-2">
          Form components
        </p>
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.NumberField} />
        <SidebarBtnElement formElement={FormElements.TextAreaField} />
        <SidebarBtnElement formElement={FormElements.DateField} />
        <SidebarBtnElement formElement={FormElements.SelectField} />
        <SidebarBtnElement formElement={FormElements.CheckboxField} />
      </div>
    </div>
  );
};
export default SidebarElements;
