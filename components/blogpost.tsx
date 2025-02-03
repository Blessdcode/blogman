import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FaCalendarAlt, MdOutlineArrowOutward } from "@/utils/icons";
import Image from "next/image";
import Link from "next/link";
import SafeContent from "@/utils/SafeContent";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DeleteButton from "./deleteButton";
import { authOptions } from "@/app/utils/authOptions";

interface PostProps {
  id: string;
  author: string;
  date: string;
  imageUrl?: string;
  title: string;
  content: string;
  links?: string[];
  category?: string;
  authorEmail?: string;
}

const BlogPost = async ({
  id,
  title,
  content,
  author = "Anonymous",
  imageUrl,
  links,
  category,
  date,
  authorEmail,
}: PostProps) => {
  const authorInitial = author ? author.charAt(0).toUpperCase() : "A";

  const truncatedContent =
    content?.length > 200 ? content.substring(0, 200) + "..." : content || "";

  const session = await getServerSession(authOptions);

  const isEditable = session && session?.user?.email === authorEmail;
  console.log(isEditable);

  const dateObject = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  return (
    <Card className="w-full md:max-w-[400px] md:w-fit  hover:shadow-lg transition-shadow duration-300 ">
      {/* Image Section */}
      <div className="flex justify-center items-start flex-col flex-wrap">
        <div className="relative w-full flex-1 max-h-[550px] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={500}
              height={500}
              className="object-cover w-full h-42  hover:scale-150 transition-all duration-300 cursor-pointer"
            />
          ) : (
            <Image
              src="/static/images/thumbnail.png"
              width={500}
              height={500}
              alt="placeholder"
              className="object-cover w-full h-42 bg-gray-100 "
            />
          )}
          {category && (
            <Badge className="absolute top-4 left-4 bg-darkBlue">
              {category}
            </Badge>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col justify-between h-full w-full ">
          <div>
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-bold mb-2 line-clamp-2 flex items-center justify-between">
                {title || "Untitled Post"}
                <Link href={`/posts/${id}`}>
                  <MdOutlineArrowOutward size={26} />
                </Link>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <p className="text-gray-600 mb-4 line-clamp-3">
                {/* {truncatedContent} */}
                <SafeContent content={truncatedContent || ""} />
              </p>

              {/* Links Section */}
              {links && links.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {links.map((link, index) => (
                    <Badge
                      key={index}
                      variant="primary"
                      className="flex items-center gap-1 truncate max-w-fit">
                      {/* <Link2Icon className="w-3 h-3" /> */}
                      <Link href={`${link}`}>
                        <span className="truncate max-w-[50px]">{link}</span>
                      </Link>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </div>

          {/* Author Section */}
          <div className="flex items-center gap-3 mt-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback>{authorInitial}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{author}</p>
              <div className="flex items-center text-sm text-gray-500">
                <FaCalendarAlt className="w-4 h-4 mr-1" />
                <time>Posted {formattedDate}</time>
              </div>
            </div>
          </div>

          {isEditable && (
            <div className="flex items-center justify-between gap-3 font-bold py-2 px-4 rounded-md  w-fit ">
              <Link href={`/edit-post/${id}`}>Edit</Link>
              <>
                <DeleteButton id={id} />
              </>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BlogPost;
