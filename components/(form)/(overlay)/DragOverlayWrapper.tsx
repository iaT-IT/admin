'use client';

import { SidebarElementOverlay } from '@/components/(form)/(overlay)/SidebarElementOverlay';
import { ElementsType, FormElements } from '@/components/(form)/FormElements';
import useDesigner from '@/hooks/useDesigner';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';

const DragOverlayWrapper = () => {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  let node = <div>No drag overlay</div>;

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });
  if (!draggedItem) return null;
  const isSidebarBtnElement = draggedItem?.data.current?.isDesignerBtnElement;
  const isDesignerElement = draggedItem?.data.current?.isDesignerElement;

  if (isSidebarBtnElement) {
    const type = draggedItem.data.current?.type as ElementsType;
    node = <SidebarElementOverlay formElement={FormElements[type]} />;
  }

  if (isDesignerElement) {
    const elementId = draggedItem.data.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) {
      node = <div>Element not found</div>;
    } else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;
      node = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
};
export default DragOverlayWrapper;
