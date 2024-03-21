"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const NewsInput = () => {
  const [keyword, setKeyword] = useState("");

  const getNews = () => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${keyword}&apiKey=4a415886915946b1b2b6cf7763d54e47`
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Link href={`/news/${encodeURIComponent(keyword)}`}>Get News</Link>
    </div>
  );
};

export default NewsInput;
