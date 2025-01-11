import { getIp } from '~/lib/ip';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export const useUserLocation = () => {
  const [location, setLocation] = useState<string | null>(null);
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
      localStorage.setItem('userLocation', JSON.stringify(data.city));
      setLocation(data.city.replace(/['"]/g, ''));

      setLocationSearchParam(data.city.replace(/['"]/g, ''));
    });
  };

  const setLocationSearchParam = (location: string) => {
    params.set('location', location);
    setSearchParams(params);
  };

  const setUserLocation = (location: string) => {
    setLocation(location);
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
