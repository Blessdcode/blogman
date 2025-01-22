import React from "react";
import Image from "next/image";
import { TPost } from "@/types/types";
import { FaCalendarAlt } from "react-icons/fa";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import SafeContent from "@/utils/SafeContent";

// import { redirect } from "next/navigation";

const fetchPost = async (): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
      cache: "no-store",
    });

    if (res.ok) {
      const posts = await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

const DetailPage = async ({ params }: { params: { id: string } }) => {
  // const router= ()=>{
  //   redirect("/")
  // }

  const { id } = params;
  const posts = await fetchPost();
  const post = posts?.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Post not found</p>
      </div>
    );
  }

  const authorInitial = post.author.name
    ? post.author.name.charAt(0).toUpperCase()
    : "A";

  const dateObject = new Date(post.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-8 sm:my-16 my-6">
      {/* Hero Section */}
      <div className="relative w-full max-w-4xl rounded-lg overflow-hidden shadow-md bg-white">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={800}
            height={400}
            className="object-cover w-full h-64"
          />
        ) : (
          <Image
            src="/static/images/thumbnail.png"
            alt={post.title}
            width={800}
            height={400}
            className="object-cover w-full h-64"
          />
        )}

        <div className="absolute bottom-4 left-4">
          {post.category && (
            <Badge className="bg-darkBlue text-white px-3 py-1">
              {post.category}
            </Badge>
          )}
        </div>
      </div>

      {/* Title Section */}
      <div className="w-full max-w-4xl mt-6">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">{post.title}</h1>
        <div className="flex items-center text-gray-600 text-sm">
          <FaCalendarAlt className="mr-2" />
          <time>Posted {formattedDate}</time>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-4xl mt-6 p-6 bg-white shadow-md rounded-lg text-black">
        <SafeContent content={post.content || ""} />
      </div>

      {/* Author Section */}
      <div className="w-full max-w-4xl mt-6 flex items-center bg-white shadow-md p-4 rounded-lg">
        <Avatar className="h-12 w-12 mr-4 text-gray-800">
          <AvatarFallback>{authorInitial}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-medium text-gray-800">
            {post.author.name}
          </p>
          <p className="text-sm text-gray-500">Author</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
