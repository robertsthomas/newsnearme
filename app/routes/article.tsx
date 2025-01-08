import { data } from 'react-router';
import { fetchArticleSearch } from '~/functions/api';
import type { Route } from './+types/article';
import type { Article } from 'types';
import { getArticleId } from '~/lib/utils';

export async function clientLoader({ params }: Route.LoaderArgs) {
  const location =
    localStorage.getItem('userLocation')?.replace(/['"]/g, '') || '';

  const articleId = params.articleId;

  const articlesQuery = await fetchArticleSearch(location);
  const articles = articlesQuery.response?.docs as Article[];

  const article = articles.find(
    (article) => getArticleId(article._id) === articleId
  );

  return data({ article });
}
export default function Article({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;
  return <main className='container mx-auto px-4 py-24'>Article</main>;
}
