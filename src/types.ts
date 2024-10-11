export interface MovieData {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  releaseDate: string;
  company: string;
  genres: string[];
  runtime: number;
  posterImgUrl: string;
}

export interface ReviewData {
  id: number;
  createdAt: string;
  content: string;
  author: string;
  movieId: number;
}
