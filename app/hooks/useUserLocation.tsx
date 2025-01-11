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
      return JSON.parse(storedLocation).replace(/['"]/g, '');
    }
    return '';
  };
  const fetchIpLocation = async () => {
    if (getLocationFromLocalStorage() ?? searchParams.get('location')) return;
    getIp().then((data) => {
      localStorage.setItem(
        'userLocation',
        JSON.stringify(data.city.replace(/['"]/g, ''))
      );

      setLocationSearchParam(data.city.replace(/['"]/g, ''));
    });
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
