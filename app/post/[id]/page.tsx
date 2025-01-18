import Post from "@/data/data";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const post = Post.find((post) => post.id === id);
  return <div>{id}</div>;
};

export default page;
