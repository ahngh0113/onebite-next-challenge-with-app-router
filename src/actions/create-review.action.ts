"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!movieId || !content || !author) {
    return {
      status: false,
      error: "내용과 작성자를 입력해 주세요.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOVIE_API_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ movieId, content, author }),
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
      error: `리뷰 저장에 실패했습니다. ${error}`,
    };
  }
}
