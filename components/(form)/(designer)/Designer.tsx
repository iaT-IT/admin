import RightDesigner from '@/components/(form)/(designer)/(right)/RightDesigner';
import LeftDesigner from '@/components/(form)/(designer)/(left)/LeftDesigner';

const Designer = () => {
  return (
    <div className="flex  w-full h-full gap-3">
      <LeftDesigner />
      <RightDesigner />
    </div>
  );
};

export default Designer;
