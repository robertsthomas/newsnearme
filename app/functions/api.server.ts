import type { Article } from 'types';
import { getArticleId } from '~/lib/utils';

/**
 * This file only runs on the server via the loader function.
 * If we want to run functions client side, we need to create an api.client.ts file.
 */

// Setup articles cache
let cachedArticles: Article[] | null = null;
let cachedLocation: string | null = null;
let lastFetchedTime: number = 0;

export const fetchArticleSearch = async (location: string) => {
  /**
   * Fetches articles from the New York Times API
   * We cache the articles array for 24 hours
   * If the location is the same as the last fetched location
   * and the cache is valid we return the cached articles array.
   * Cache is based on the location and the current time.
   */

  const currentTime = Date.now();

  if (
    cachedArticles &&
    cachedLocation === location &&
    currentTime - lastFetchedTime < 86400000 // Cache is valid for 24 hours
  ) {
    console.log('Returning cached Articles Array');
    return cachedArticles;
  }

  const data = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${location}&api-key=${
      import.meta.env.VITE_NYT_API_KEY
    }`
  ).then((res) => res.json());

  const articles = data.response?.docs as Article[];

  cachedArticles = articles;
  cachedLocation = location;
  lastFetchedTime = currentTime;

  console.log('Fetched new Articles Array');

  return articles;
};

export async function getSingleArticle(id: string, location: string) {
  /**
   * Filters the articles array to find the article with the given id
   * and returns the article object.
   */
  const articles = await fetchArticleSearch(location);

  const articleIndex = articles?.findIndex(
    (article: Article) => getArticleId(article._id) === id
  );
  return articles[articleIndex];
}
