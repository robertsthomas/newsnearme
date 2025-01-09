import { data, useNavigate } from 'react-router';
import { fetchArticleSearch } from '~/functions/api';
import type { Route } from './+types/article';
import type { Article } from 'types';
import { getArticleId } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export function headers(_: Route.HeadersArgs) {
  return {
    'Cache-Control': 'public, max-age=31536000, immutable',
  };
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const location =
    localStorage.getItem('userLocation')?.replace(/['"]/g, '') || '';

  const articleId = params.articleId;

  const articlesQuery = await fetchArticleSearch(location);
  const articles = articlesQuery.response?.docs as Article[] | [];

  const article =
    articles?.find((article) => getArticleId(article._id) === articleId) || [];

  return data({ article });
}
export default function Article({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;
  const navigate = useNavigate();
  console.log('article', article);
  return (
    <main className='container mx-auto px-4 py-24'>
      <div className='flex flex-col '>
        <Button
          variant='outline'
          className='w-min'
          onClick={() => navigate(-1)}
        >
          <ChevronLeft /> Back to articles
        </Button>
      </div>
    </main>
  );
}
