import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter();
  console.log(router);
  return <div>{router.query.slug}</div>;
};

export default Page;
