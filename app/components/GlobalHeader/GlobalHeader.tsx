import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const GlobalHeader = () => {
  return (
    <header className='sticky top-0 bg-white shadow-md z-10 '>
      <div className='flex items-center justify-between bg-slate-100 border-b border-slate-200 h-20 px-10 absolute w-full'>
        <h1 className='text-3xl font-bold text-black'>News Near Me</h1>
        <div className='flex items-center gap-4 w-1/2'>
          <Button>
            <Search className='w-4 h-4' />
          </Button>
          <Input placeholder='Search near locations' />
        </div>
      </div>
    </header>
  );
};
