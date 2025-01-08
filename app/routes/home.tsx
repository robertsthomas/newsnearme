import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_VERCEL };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 
          {articlesQuery.data?.response?.docs.map((article: Article) => (

            <Card key={article._id} className="w-full">
              <img src={`https://static01.nyt.com/${article.multimedia[0]?.url}`} className="w-full h-full object-cover" />
              <h1>{article.snippet}</h1>
            </Card>
          ))} */}
        </div>

      </div >
    </main>
  );

}
