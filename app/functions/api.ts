export const fetchArticleSearch = async (location: string) => {
  const data = fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${location}&api-key=${
      import.meta.env.VITE_NYT_API_KEY
    }`
  ).then((res) => res.json());
  return data;
};
