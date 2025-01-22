import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { TPost } from "@/types/types";
import HeadingModel from "@/components/heading";
import BlogPost from "@/components/blogpost";

const getPost = async (email: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`);

    if (res.ok) {
      const posts = await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

const page = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  // let posts = [];
  if (!session) {
    redirect("/");
  }

  // if (email) {
  //   posts = await getPost(email);
  // }
  
  const posts = email ? await getPost(email) : [];
    console.log(posts, "post with email");

  console.log(posts);
  return (
    <div className="p-3 md:p-0">
      <HeadingModel title="DASHBOARD" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:my-16 my-6">
        {posts && posts.length > 0 ? (
          posts.map((post: TPost) => (
            <BlogPost
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author.name}
              imageUrl={post.imageUrl}
              links={post.links || []}
              category={post.catName}
              date={post.createdAt}
            />
          ))
        ) : (
          <div className="py-6">
            No posts created yet.{" "}
            <Link className="underline" href={"/create-post"}>
              Create New
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
