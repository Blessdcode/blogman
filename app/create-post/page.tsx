import React from "react";
import CreatePost from "@/components/create-post";
import HeadingModel from "@/components/heading";

const page = () => {
  return (
    <div>
      {" "}
      <HeadingModel title="Create post" />
      <CreatePost/>
    </div>
  );
};

export default page;
