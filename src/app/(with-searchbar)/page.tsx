import { MovieData } from "@/types";
import style from "./page.module.css";
import Link from "next/link";
import MovieItem from "@/components/movie-item";

async function RecommendMovie() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/movie/random`,
    { next: { revalidate: 10 } }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }

  const recommendMovie: MovieData[] = await response.json();

  return (
    <div className={style.movie_items}>
      {recommendMovie.map((movie) => {
        return (
          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className={style.recommend_movie_item}
          >
            <MovieItem {...movie} />
          </Link>
        );
      })}
    </div>
  );
}

async function AllMovie() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/movie`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }

  const allMovie: MovieData[] = await response.json();

  return (
    <div className={style.movie_items}>
      {allMovie.map((movie) => {
        return (
          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className={style.all_movie_item}
          >
            <MovieItem {...movie} />
          </Link>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <RecommendMovie />
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <AllMovie />
      </section>
    </div>
  );
}
