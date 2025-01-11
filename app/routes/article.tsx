import { data, Link, useNavigate } from 'react-router';
import { fetchArticleSearch } from '~/functions/api';
import type { Route } from './+types/article';
import { getArticleId } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { ChevronLeft, Newspaper } from 'lucide-react';
import type { Article } from 'types';
import dayjs from 'dayjs';
import { CalendarDays } from 'lucide-react';
import { IMAGE_URL_PREFIX } from '~/lib/constants';
import { getSingleArticle } from '~/functions/api.server';

let cachedArticle: Article | null = null;
let lastFetchedTimeArt: number = 0;

export async function loader({ params }: Route.LoaderArgs) {
  const currentTime = Date.now();
  const location = params.location;

  if (
    cachedArticle &&
    params.articleId === getArticleId(cachedArticle._id) &&
    currentTime - lastFetchedTimeArt < 86400000 // Cache is valid for 24 hours
  ) {
    console.log('Returning cached Article');
    return data({ article: cachedArticle });
  }

  const article = await getSingleArticle(params.articleId, location);
  cachedArticle = article;
  lastFetchedTimeArt = currentTime;
  console.log('Fetched new Article');

  return data({ article });
}
export default function SingleArticle({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;
  const navigate = useNavigate();

  if (!article) {
    return (
      <main className='container mx-auto px-4 py-24'>
        <p>Article not found</p>
      </main>
    );
  }
  return (
    <main className='w-full mx-auto px-4 lg:max-w-4xl lg:mx-auto py-24'>
      <div className='flex flex-col'>
        <Button
          variant='outline'
          className='w-min mt-6 mb-10'
          onClick={() => navigate(-1)}
        >
          <ChevronLeft /> Back to articles
        </Button>
      </div>
      <h1 className='text-3xl font-bold mb-4'>{article.headline.main}</h1>
      <div className='flex items-center text-gray-600 mb-4'>
        <CalendarDays size={16} className='mr-1' />
        <span>{dayjs(article.pub_date).format('MMM D, YYYY')}</span>
      </div>
      <p className='text-gray-600 mb-6'>{article.byline.original}</p>
      {!!article.multimedia.length ? (
        <div className='mb-6'>
          <img
            src={`${IMAGE_URL_PREFIX}${article.multimedia[0].url}`}
            alt={article.headline.main}
            className='w-full h-96 object-cover object-top rounded-lg'
          />

          <p className='text-gray-700 text-sm mt-2'>
            {article.multimedia[0].caption}
          </p>
        </div>
      ) : (
        <div className='mb-6 bg-gray-100 h-64 flex items-center justify-center rounded-lg'>
          <Newspaper className='w-24 h-24 text-gray-400' />
        </div>
      )}
      <p className='text-lg mb-6'>{article.abstract}</p>
      <Button variant='link' asChild className='mx-auto w-full text-center'>
        <a
          href={article.web_url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-xl'
        >
          Read entire story!
        </a>
      </Button>
    </main>
  );
}
