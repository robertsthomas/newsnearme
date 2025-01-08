import { getIp } from '~/lib/ip';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export const useUserLocation = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams();

  useEffect(() => {
    const searchParamLocation = searchParams
      .get('location')
      ?.replace(/['"]/g, '');
    const storedLocation = localStorage.getItem('userLocation');

    if (searchParamLocation) {
      setLocation(searchParamLocation);
      localStorage.setItem('userLocation', JSON.stringify(searchParamLocation));
      return;
    }

    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
      params.set('location', storedLocation);
      setSearchParams(params);
    } else {
      getIp()
        .then((data) => {
          localStorage.setItem('userLocation', JSON.stringify(data.city));
          setLocation(data.city.replace(/['"]/g, ''));
          params.set('location', data.city);
          setSearchParams(params);
        })
        .catch((error) => {
          console.error('Error fetching location data:', error);
        });
    }
  }, [location]);

  const setUserLocation = (location: string) => {
    params.set('location', location);
    setSearchParams(params);
    localStorage.setItem('userLocation', JSON.stringify(location));
  };

  return {
    location,
    setUserLocation,
  };
};
