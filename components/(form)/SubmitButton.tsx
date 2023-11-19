'use client';

import { Button } from '@/components/ui/button';
import { Pen } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SubmitButtonProps {
  shareURL: string;
}
const SubmitButton: React.FC<SubmitButtonProps> = ({ shareURL }) => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const shareLink = `${window.location.origin}/submit/${shareURL}`;
  if (!isMounted) return null;
  return (
    <Button
      className="px-5 py-3"
      onClick={() => window.open(shareLink, '_blank')}
    >
      <Pen className="mr-3 h-4 w-4" />
      Submit
    </Button>
  );
};
export default SubmitButton;
