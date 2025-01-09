import { useLocation, useNavigate } from 'react-router';
import { useUserLocation } from '~/hooks/useUserLocation';
import { LocationSearch } from '../LocationSearch';

export const GlobalHeader = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const { location: userLocation, setUserLocation } = useUserLocation();

  const handleSearch = async (location: string) => {
    await navigate(`../?location=${location}`);
    setUserLocation(location);
  };

  return (
    <header className='sticky top-0 bg-white shadow-md z-10 '>
      <div className='flex items-center justify-between bg-slate-100 border-b border-slate-200 h-20 px-10 absolute w-full'>
        <h1 className='text-3xl font-bold text-black'>News Near Me</h1>
        {((location.pathname !== '/' && !!userLocation) ||
          location.pathname === '/') && (
          <div className='w-1/3'>
            <LocationSearch onSearch={handleSearch} withButton />
          </div>
        )}
      </div>
    </header>
  );
};
