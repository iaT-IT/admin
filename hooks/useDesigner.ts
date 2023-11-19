import { FormElementInstance } from '@/components/(form)/FormElements';
import { Dispatch, SetStateAction } from 'react';
import { create } from 'zustand';

interface State {
  elements: FormElementInstance[] | [];
  selectedElement: FormElementInstance | null;

  setElements: (elements: FormElementInstance[]) => void;

  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;

  setSelectedElement: (element: FormElementInstance | null) => void;

  updateElement: (id: string, element: FormElementInstance) => void;
}

const useDesigner = create<State>((set, get) => ({
  elements: [],
  selectedElement: null,
  setElements: (elements: FormElementInstance[]) =>
    set((state) => ({
      elements,
    })),
  setSelectedElement: (element: FormElementInstance | null) =>
    set((state) => ({
      selectedElement: element,
    })),
  addElement: (index: number, element: FormElementInstance) => {
    const newElements = [...get().elements];
    newElements.splice(index, 0, element);
    set((state) => ({
      elements: newElements,
    }));
  },
  removeElement: (id: string) => {
    set((state) => ({
      elements: state.elements.filter((element) => element.id !== id),
    }));
  },
  updateElement: (id: string, element: FormElementInstance) => {
    const newElements = [...get().elements];
    const index = newElements.findIndex((el) => el.id === id);
    newElements[index] = element;
    set((state) => ({
      elements: newElements,
    }));
  },
}));

export default useDesigner;
