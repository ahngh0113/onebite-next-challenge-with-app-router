"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";

import style from "./layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (!inputRef.current) {
      return;
    }
    const inputValue = inputRef.current.value;
    router.push(`/search?q=${inputValue}`);
  };

  return (
    <div>
      <div className={style.searchable_container}>
        <input
          ref={inputRef}
          type="text"
          placeholder="검색어를 입력하세요 ..."
          onKeyUp={onKeyUp}
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
