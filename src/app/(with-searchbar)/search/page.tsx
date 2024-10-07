import style from "./page.module.css";
import Link from "next/link";
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  const serachName = searchParams.q;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/movie/search?q=${serachName}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }

  const searchMovie: MovieData[] = await response.json();

  if (searchMovie.length === 0) {
    return (
      <div className={style.not_found}>
        &quot;{serachName}&quot;에 대한 검색 결과가 없습니다.
      </div>
    );
  }
  return (
    <div className={style.movie_items}>
      {searchMovie.map((movie) => {
        return (
          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className={style.movie_item}
          >
            <MovieItem {...movie} />
          </Link>
        );
      })}
    </div>
  );
}
