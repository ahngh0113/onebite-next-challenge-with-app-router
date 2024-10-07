import style from "./page.module.css";
import { MovieData } from "@/types";

export default async function Page({
  params,
}: {
  params: {
    id: string | string[];
  };
}) {
  const movieId = Number(params.id);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/movie/${movieId}`
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
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
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} alt={`${title} 포스터 이미지`} />
      </div>
      <div className={style.title}>{title}</div>
      <div>
        {releaseDate} / {genres.join(", ")} / {runtime}분
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
