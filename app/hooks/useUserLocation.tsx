import { getIp } from '~/lib/ip';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

/**
 *
 * This hook fetches the user's location from the browser's IP address.
 * It also sets the location in the URL search params which is used
 * in loaders to fetch articles for a specific location.
 */

export const useUserLocation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams();

  const getLocationFromLocalStorage = () => {
  const storedLocation = localStorage.getItem('userLocation');
  if (storedLocation) {
    const parsed = JSON.parse(storedLocation);
    return typeof parsed === 'string' ? parsed.replace(/['"]/g, '') : '';
  }
  return '';
};

const fetchIpLocation = async () => {
  if (getLocationFromLocalStorage() || searchParams.get('location')) return;
  try {
    const data = await getIp();
    if (data?.city && typeof data.city === 'string') {
      const cleanCity = data.city.replace(/['"]/g, '');
      localStorage.setItem('userLocation', JSON.stringify(cleanCity));
      setLocationSearchParam(cleanCity);
    }
  } catch (err) {
    console.error('Failed to fetch IP location', err);
  }
};


  const setLocationSearchParam = (location: string) => {
    params.set('location', location);
    setSearchParams(params);
  };

  const setUserLocation = (location: string) => {
    localStorage.setItem('userLocation', JSON.stringify(location));
    setLocationSearchParam(location);
  };

  useEffect(() => {
    fetchIpLocation();
  }, []);

  return {
    location: searchParams.get('location'),
    setUserLocation,
  };
};
