import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader className="animate-spin h-12 aspect-square" />
    </div>
  );
};
export default Loading;
