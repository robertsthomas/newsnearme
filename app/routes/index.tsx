import type { Route } from './+types/index';
import { data, useNavigation } from 'react-router';
import { useUserLocation } from '~/hooks';
import { getArticleId } from '~/lib/utils';
import { fetchArticleSearch } from '~/functions/api.server';
import { ArticleCard, LocationSearch, PageLoader } from '~/components';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'News Near Me' },
    { name: 'description', content: 'Welcome to NNM!' },
  ];
}

export async function loader({ request }: Route.ClientLoaderArgs) {
  // Fetch articles based on url search params "location"
  const url = new URL(request.url);
  const location = url.searchParams.get('location') || '';
  const articles = await fetchArticleSearch(location);

  return data({ articles, location });
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { setUserLocation } = useUserLocation();
  const navigation = useNavigation();

  const { articles, location } = loaderData;
  const isNavigating = Boolean(navigation.location);

  if (isNavigating) return <PageLoader />;

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
