"use client";
import Link from "next/link";
import React, { useState } from "react";

const NewsInput = () => {
  const [keyword, setKeyword] = useState("");
  return (
    <div className="flex flex-col justify-center min-h-screen items-center gap-4">
      {/* <Image src="https://leaguex.com/_next/image?url=%2Fimg%2Flogos%2Flx_logo.png&w=3840&q=75" width={600} height={200}/> */}
      <input
        className="border p-2 w-full rounded-md focus-visible:outline-0 dark:bg-slate-800 dark:border-slate-800 dark:text-white"
        type="text"
        placeholder="Enter Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Link
        href={`/news/${encodeURIComponent(keyword)}`}
        className="border border-blue-700 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Get News
      </Link>
    </div>
  );
};

export default NewsInput;
