import { notFound } from "next/navigation";
import style from "./page.module.css";
import { MovieData, ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/movie`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    throw new Error("error!");
  }

  const movies: MovieData[] = await response.json();
  return movies.map(({ id }) => ({ id: id.toString() }));
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/movie/${movieId}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      return notFound();
    }
  }

  const detailMovie: MovieData = await response.json();

  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = detailMovie;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} alt={`${title} 포스터 이미지`} />
      </div>
      <div className={style.title}>{title}</div>
      <div>
        {releaseDate} / {genres ? genres.join(", ") : ""} / {runtime}분
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/review/movie/${movieId}`,
    { next: { tags: [`review=${movieId}`] } }
  );
  if (!response.ok) {
    throw new Error(`review fetch fail - ${response.statusText}`);
  }
  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((reviewData) => (
        <ReviewItem key={reviewData.id} {...reviewData} />
      ))}
    </section>
  );
}

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className={style.container}>
      <MovieDetail movieId={params.id} />
      <ReviewEditor movieId={params.id} />
      <ReviewList movieId={params.id} />
    </div>
  );
}
