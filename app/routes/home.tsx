import { fetchArticleSearch } from "~/functions/api";
import type { Route } from "./+types/home";
import type { Article } from "types";
import { data } from "react-router";
import { ArticleCard } from "~/components/ArticleCard";
import { useUserLocation } from "~/hooks/useUserLocation";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "News Near Me" },
    { name: "description", content: "Welcome to NNM!" },
  ];
}

export function headers(_: Route.HeadersArgs) {
  return {
    "Cache-Control": "public, max-age=3600" // stale-while-revalidate=86400
  };
}

export async function loader({ context, request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const location = url.searchParams.get("location") || ""

  const articlesQuery = await fetchArticleSearch(location)
  const articles = articlesQuery.response?.docs as Article[]

  return data({ articles });
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { articles } = loaderData;
  useUserLocation()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {articles.map((article) => (
            <ArticleCard article={article} key={article._id} />

          ))}
        </div>

      </div >
    </main>
  );

}
