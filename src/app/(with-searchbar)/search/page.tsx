import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";
import style from "./page.module.css";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/movie/search?q=${q}`,
    {
      cache: "force-cache",
    }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const movies: MovieData[] = await response.json();

  return movies.map((movie) => <MovieItem key={movie.id} {...movie} />);
}

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <div className={style.container}>
      <Suspense
        key={searchParams.q || ""}
        fallback={<MovieListSkeleton count={9} />}
      >
        <SearchResult q={searchParams.q || ""} />
      </Suspense>
    </div>
  );
}
