'use client';

import useDesigner from '@/hooks/useDesigner';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Form } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const DndProvider = ({
  form,
  children,
}: {
  form: Form;
  children: React.ReactNode;
}) => {
  const [isReady, setIsReady] = useState(false);

  const { setElements, setSelectedElement } = useDesigner();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, //10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  useEffect(() => {
    const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null);
    const readyTimeout = setTimeout(() => {
      setIsReady(true);
    }, 500);
    return () => {
      clearTimeout(readyTimeout);
    };
  }, [form, setElements]);
  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Loader2 className="animate-spin h-12 aspect-square" />
      </div>
    );
  }
  return <DndContext sensors={sensors}>{children}</DndContext>;
};
export default DndProvider;
