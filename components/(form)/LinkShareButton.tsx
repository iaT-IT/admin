'use client';

import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface LinkShareButtonProps {
  shareURL: string;
}
const LinkShareButton: React.FC<LinkShareButtonProps> = ({ shareURL }) => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const shareLink = `${window.location.origin}/submit/${shareURL}`;
  if (!isMounted) return null;
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Button
        onClick={() => {
          navigator.clipboard.writeText(shareLink);

          toast.success('Link copied to clipboard');
        }}
        className="px-5 py-3"
      >
        <Share className="mr-2 h-4 w-4 " />
        Share Link
      </Button>
    </div>
  );
};
export default LinkShareButton;
