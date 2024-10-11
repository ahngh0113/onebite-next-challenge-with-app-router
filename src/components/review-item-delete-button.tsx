"use client";

import { deleteReviewAction } from "@/actions/delete-review.action";
import React, { useActionState, useEffect, useRef } from "react";

export default function ReviewItemDeleteButton({
  reviewId,
  movieId,
}: {
  reviewId: number;
  movieId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input type="hidden" name="reviewId" value={reviewId} />
      <input type="hidden" name="movieId" value={movieId} />
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>
          🗑️ 리뷰 삭제하기
        </div>
      )}
    </form>
  );
}
