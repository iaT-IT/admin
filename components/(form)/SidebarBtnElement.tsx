import { FormElement } from '@/components/(form)/FormElements';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';

interface SidebarBtnElementProps {
  formElement: FormElement;
}
const SidebarBtnElement: React.FC<SidebarBtnElementProps> = ({
  formElement,
}) => {
  const { icon: Icon, label } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      className={cn(
        'flex flex-col gap-2 h-[120px] w-[120px] cursor-grab',
        draggable.isDragging && 'ring-2 ring-primary',
      )}
      variant={'outline'}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SidebarBtnElement;
