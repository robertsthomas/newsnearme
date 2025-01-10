import { fetchArticleSearch } from '~/functions/api';
import type { Route } from './+types/index';
import type { Article } from 'types';
import { data, useNavigation } from 'react-router';
import { ArticleCard } from '~/components/ArticleCard';
import { useUserLocation } from '~/hooks/useUserLocation';
import { getArticleId } from '~/lib/utils';
import { LocationSearch } from '~/components/LocationSearch';
import { Loader2 } from 'lucide-react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'News Near Me' },
    { name: 'description', content: 'Welcome to NNM!' },
  ];
}

let cachedArticles: Article[] | null = null;
let cachedLocation: string | null = null;
let lastFetchedTime: number = 0;

export async function loader({ context, request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const location = url.searchParams.get('location') || '';
  const currentTime = Date.now();

  // Check if cached data exists, else fetch new data
  if (
    cachedArticles &&
    cachedLocation === location &&
    currentTime - lastFetchedTime < 86400000 // Cache is valid for 24 hours
  ) {
    console.log('Returning cached data');
    return data({ articles: cachedArticles, location });
  }

  const articlesQuery = await fetchArticleSearch(location);
  const articles = articlesQuery.response?.docs as Article[];

  cachedArticles = articles;
  cachedLocation = location;
  lastFetchedTime = currentTime;

  console.log('Fetched new data');

  return data({ articles, location });
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { articles, location } = loaderData;
  const { setUserLocation } = useUserLocation();
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  if (isNavigating) {
    return (
      <div className='container flex flex-col gap-3 items-center justify-center h-screen'>
        <Loader2 className='w-12 h-12 text-gray-600 animate-spin' />
        <p>Loading article detail</p>
      </div>
    );
  }

  return (
    <main className='container mx-auto px-4 py-24 h-screen pb-44'>
      {location ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {articles?.map((article) => (
            <ArticleCard article={article} key={getArticleId(article._id)} />
          ))}
        </div>
      ) : (
        <div className='h-full flex items-center w-1/2 mx-auto'>
          <LocationSearch onSearch={setUserLocation} size='lg' />
        </div>
      )}
    </main>
  );
}
