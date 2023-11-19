'use client';

import PropertiesComponent from '@/components/(form)/(designer)/(right)/PropertiesComponent';
import SidebarElements from '@/components/(form)/(designer)/(right)/SidebarElements';
import useDesigner from '@/hooks/useDesigner';

const RightDesigner = () => {
  const { selectedElement } = useDesigner();

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2  border border-slate-500 rounded-md p-4 bg-background h-screen overflow-y-auto pb-40 scrollbar-hidden">
      {!selectedElement && <SidebarElements />}
      {selectedElement && <PropertiesComponent />}
    </aside>
  );
};
export default RightDesigner;
