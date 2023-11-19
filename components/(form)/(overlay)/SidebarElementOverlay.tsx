import { FormElement } from '@/components/(form)/FormElements';
import { Button } from '@/components/ui/button';

interface SidebarBtnElementProps {
  formElement: FormElement;
}
export const SidebarElementOverlay: React.FC<SidebarBtnElementProps> = ({
  formElement,
}) => {
  const { icon: Icon, label } = formElement.designerBtnElement;

  return (
    <Button
      className={'flex flex-col gap-2 h-[120px] w-[120px] cursor-grab'}
      variant={'outline'}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};
