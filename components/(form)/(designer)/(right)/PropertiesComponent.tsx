import { FormElements } from '@/components/(form)/FormElements';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useDesigner from '@/hooks/useDesigner';
import { X } from 'lucide-react';

const PropertiesComponent = () => {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;
  /* Properties Component */
  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;
  return (
    <div className="flex flex-col p-2 ">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => setSelectedElement(null)}
        >
          <X />
        </Button>
      </div>
      <Separator className="mb-4" />
      {/* Properties Component */}
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};
export default PropertiesComponent;
