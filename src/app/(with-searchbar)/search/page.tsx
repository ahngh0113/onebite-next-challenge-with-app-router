import dummyData from "@/mocks/dummy.json";
import style from "./page.module.css";
import Link from "next/link";
import MovieItem from "@/components/movie-item";

export default function Page({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  const serachName = searchParams.q as string;

  const searchMovie = dummyData.filter(({ title }) =>
    title.includes(serachName)
  );

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
