'use client';

import {
  FormElementInstance,
  FormElements,
} from '@/components/(form)/FormElements';
import { Button } from '@/components/ui/button';
import useDesigner from '@/hooks/useDesigner';
import { cn } from '@/lib/utils';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Trash } from 'lucide-react';
import { useState } from 'react';

function DesignerElements({ element }: { element: FormElementInstance }) {
  const { removeElement, setSelectedElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState(false);
  /* Drag and drop on top or bottom of element */
  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  /* Draggable */
  const draggable = useDraggable({
    id: element.id + '-darg-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });
  /* Designer Component */
  const DesignerElement = FormElements[element.type].designerComponent;
  if (draggable.isDragging) return null;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
      className="relative min-h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
    >
      {/*drag handler */}
      <div
        ref={topHalf.setNodeRef}
        className={cn('absolute w-full h-1/2 rounded-t-md ')}
      />
      <div
        ref={bottomHalf.setNodeRef}
        className={cn('absolute  w-full h-1/2 bottom-0 rounded-b-md')}
      />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500"
              variant={'outline'}
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <Trash className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-xs">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 h-4 w-full rounded-md bg-primary rounded-b-none" />
      )}

      <div
        className={cn(
          'flex w-full min-h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100',
          mouseIsOver && 'opacity-30',
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 h-4 w-full rounded-md bg-primary rounded-t-none" />
      )}
    </div>
  );
}
export default DesignerElements;
