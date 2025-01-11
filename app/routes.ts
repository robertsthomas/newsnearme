import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('layouts/layout.tsx', [
    index('routes/index.tsx'),
    route('articles/:location/:articleId', 'routes/article.tsx'),
  ]),
] satisfies RouteConfig;
