import DesignerElements from '@/components/(form)/(designer)/(left)/DesignerElements';
import { ElementsType, FormElements } from '@/components/(form)/FormElements';
import useDesigner from '@/hooks/useDesigner';
import { idGenerator } from '@/lib/idGenerator';
import { cn } from '@/lib/utils';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';

const LeftDesigner = () => {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner();
  /* Drop and drop container zone */
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDroppingOverDesignerDropArea =
        over.data.current?.isDesignerDropArea;

      const isDesignerBtnElement = active.data.current?.isDesignerBtnElement;
      /* first scenario: dropping a sidebar btn element over the designer drop area */
      const droppingSidebarBtnOverDesignerDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea;
      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator(),
        );
        addElement(elements.length, newElement);
        return;
      }

      const isDroppingDesignerElementTopHalf =
        over.data.current?.isTopHalfDesignerElement;
      const isDroppingDesignerElementBottomHalf =
        over.data.current?.isBottomHalfDesignerElement;

      const isDroppingDesignerElement =
        isDroppingDesignerElementTopHalf || isDroppingDesignerElementBottomHalf;
      /* check in top or bottom half dropzone */
      const droppingSidebarBtnOverDesignerElement =
        isDesignerBtnElement && isDroppingDesignerElement;

      /* Second scenario */
      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator(),
        );
        const overId = over.data.current?.elementId;
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error('Element not found');
        }
        let indexForNewElement = overElementIndex; //assume on top half
        if (isDroppingDesignerElementBottomHalf) {
          indexForNewElement += 1;
        }
        addElement(indexForNewElement, newElement);
        return;
      }
      /* Third scenario */
      const isDraggingDesignerElement = active.data.current?.isDesignerElement;
      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data.current?.elementId;
        const overId = over.data.current?.elementId;
        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId,
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('Element not found');
        }
        const activeElement = { ...elements[activeElementIndex] };
        let indexForNewElement = overElementIndex; //assume on top half
        if (isDroppingDesignerElementBottomHalf) {
          indexForNewElement += 1;
        }
        removeElement(activeId);
        addElement(indexForNewElement, activeElement);
      }
    },
  });
  return (
    <div
      className="border border-slate-500 rounded-md p-4 w-full h-screen overflow-y-auto scrollbar-hidden"
      onClick={(e) => {
        e.stopPropagation();
        if (selectedElement) setSelectedElement(null);
      }}
    >
      <div
        ref={droppable.setNodeRef}
        className={cn(
          'bg-background max-w-[920px] min-h-[50%]  m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1  ',
          droppable.isOver && 'ring-2 ring-primary',
        )}
      >
        {!droppable.isOver && elements.length === 0 && (
          <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
            Drop here
          </p>
        )}
        {droppable.isOver && elements.length === 0 && (
          <div className="p-4 w-full">
            <div className="h-[120px] rounded-md bg-primary/20"></div>
          </div>
        )}
        {/* if have element */}
        {elements.length > 0 && (
          <div className=" flex flex-col  w-full gap-2 p-4 pb-40 ">
            {elements.map((element) => {
              return (
                <DesignerElements
                  key={element.id}
                  element={element}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default LeftDesigner;
