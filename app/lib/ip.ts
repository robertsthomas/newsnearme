export const getIp = async () => {
  const response = await fetch(
    `https://api.ipstack.com/check?access_key=${import.meta.env.VITE_IP_ACCESS_KEY}&format=1`
  );
  const data = await response.json();
  console.log('ip data', data);
  return data;
};
