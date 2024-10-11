import React from "react";
import style from "./review-item.module.css";
import { ReviewData } from "@/types";

export default function ReviewItem({ reviewData }: { reviewData: ReviewData }) {
  const { id, content, author, createdAt, movieId } = reviewData;

  return (
    <div className={style.container}>
      <div className={style.top_container}>
        <div className={style.author}>{author}</div>
        <div className={style.date}>
          {new Date(createdAt).toLocaleDateString()}일 작성됨
        </div>
      </div>
      <div className={style.content}>{content}</div>
      <div className={style.delete_btn}>🗑️ 리뷰 삭제하기</div>
    </div>
  );
}
