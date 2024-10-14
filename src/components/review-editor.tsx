"use client";

import { useActionState, useEffect } from "react";
import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review.action";

export default function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);
  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="movieId" value={movieId} type="hidden" />
        <textarea
          name="content"
          placeholder="리뷰 작성"
          disabled={isPending}
          required
        />
        <div className={style.submit_container}>
          <input
            name="author"
            placeholder="작성자"
            disabled={isPending}
            required
          />
          <button disabled={isPending} type="submit">
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
