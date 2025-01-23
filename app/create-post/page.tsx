import React from "react";
import CreatePost from "@/components/create-post";
import HeadingModel from "@/components/heading";
import { authOptions } from "../utils/authOptions";
import { getServerSession } from "next-auth";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const page = () => {
  const session = getServerSession(authOptions);

  if (!session) {
    
    toast.success("Please login to create a post.");
    redirect("/");
  }

  return (
    <div>
      {" "}
      <HeadingModel title="Create post" />
      <CreatePost />
    </div>
  );
};

export default page;
