"use server";

import { revalidateTag } from "next/cache";

export async function deleteReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get("reviewId")?.toString();
  const movieId = formData.get("movieId")?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: "삭제할 리뷰가 없습니다.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/review/${reviewId}`,
      {
        method: "DELETE",
        body: JSON.stringify({ reviewId }),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    revalidateTag(`review-${movieId}`);
    return {
      status: true,
      error: null,
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다. ${error}`,
    };
  }
}
