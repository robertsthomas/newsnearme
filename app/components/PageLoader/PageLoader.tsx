import { Loader2 } from 'lucide-react';

export const PageLoader = () => {
  return (
    <div className='container flex flex-col gap-3 items-center justify-center h-screen'>
      <Loader2 className='w-12 h-12 text-gray-600 animate-spin' />
      <p>Loading article detail</p>
    </div>
  );
};
