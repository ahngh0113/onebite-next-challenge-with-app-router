import React, { Suspense } from "react";
import Searchbar from "@/components/searchbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={<></>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
