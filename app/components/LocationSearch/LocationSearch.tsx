import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '~/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { states } from '~/lib/constants';
import { useUserLocation } from '~/hooks/useUserLocation';

export const LocationSearch = ({
  withButton = false,
  onSearch = () => {},
  size = 'default',
  placeholder = 'Select a location',
}: {
  placeholder?: string;
  withButton?: boolean;
  size?: 'lg' | 'sm' | 'default';
  onSearch: (location: string) => void;
}) => {
  const { location } = useUserLocation();
  const inputSizeMap =
    size === 'lg'
      ? 'size-12 placeholder:text-lg'
      : size === 'sm'
        ? 'size-8'
        : '';

  const handleSearch = (location: string) => {
    if (onSearch) {
      onSearch(location);
    }
  };

  return (
    <div className='flex items-center gap-0 w-full'>
      {withButton && (
        <Button size={size} className='rounded-r-none pointer-events-none'>
          <Search className='w-4 h-4' />
        </Button>
      )}

      <Select onValueChange={handleSearch}>
        <SelectTrigger
          className={cn(
            'placeholder:text-black w-full bg-white',
            inputSizeMap,
            'w-full',
            withButton ? 'rounded-l-none' : ''
          )}
        >
          <SelectValue placeholder={location} />
        </SelectTrigger>
        <SelectContent>
          {states.map((state) => {
            return (
              <SelectItem key={state.value} value={state.label}>
                {state.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
