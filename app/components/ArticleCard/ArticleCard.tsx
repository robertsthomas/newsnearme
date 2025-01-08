import { Link } from 'react-router';
import { Card } from '../ui/card';
import type { Article } from 'types';
import { CalendarDays, Newspaper } from 'lucide-react';
import dayjs from 'dayjs';
import { IMAGE_URL_PREFIX } from '~/lib/constants';
import { getArticleId } from '~/lib/utils';

export const ArticleCard = ({ article }: { article: Article }) => {
  const firstImage = article.multimedia[0]?.url;
  const articleId = getArticleId(article._id);

  return (
    <Link
      to={`articles/${articleId}`}
      key={article._id}
      className='hover:outline hover:outline-2 hover:outline-slate-400 rounded-lg group'
    >
      <Card className='flex flex-col w-full relative h-96 rounded-lg'>
        <ArticleCardHeader image={firstImage} article={article} />
        <div className='p-6'>
          <div className='flex items-center text-gray-500 text-sm'>
            <CalendarDays size={16} className='mr-1' />
            <span>{dayjs(article.pub_date).format('MMM D, YYYY')}</span>
          </div>
          <h3 className='font-bold text-xl mb-2 text-gray-800 line-clamp-2 group-hover:text-slate-600 transition-colors duration-300'>
            {article.headline.main}
          </h3>
          <p className='text-gray-600 text-md mb-4 line-clamp-2'>
            {article.lead_paragraph}
          </p>
        </div>
      </Card>
    </Link>
  );
};

function ArticleCardHeader({
  image,
  article,
}: {
  image: string;
  article: Article;
}) {
  if (image) {
    return (
      <img
        data-id='article-card-image'
        src={`${IMAGE_URL_PREFIX}${image}`}
        alt={article.headline.main}
        className='w-full h-1/2 object-cover object-center rounded-t-lg'
      />
    );
  }

  return (
    <div
      className='w-full grid place-items-center h-1/2 bg-gray-100'
      data-id='article-card-icon'
    >
      <Newspaper className='w-16 h-16 text-gray-400' />
    </div>
  );
}
