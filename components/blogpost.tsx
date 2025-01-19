import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FaCalendarAlt, MdOutlineArrowOutward } from "@/utils/icons";
import Image from "next/image";
import Link from "next/link";

interface BlogPostProp {
  id: string;
  author: string;
  title: string;
  content: string;
  links?: string[];
  category?: string;
  imageUrl?: string;
}

const BlogPost = ({
  id,
  title,
  content,
  author = "Anonymous", 
  imageUrl,
  links,
  category,
}: BlogPostProp) => {
  // Get first letter of author name for avatar fallback, with null check
  const authorInitial = author ? author.charAt(0).toUpperCase() : "A";

  // Truncate content for preview
  const truncatedContent =
    content?.length > 200 ? content.substring(0, 200) + "..." : content || "";

  return (
    <Card className="w-full md:w-[400px] overflow-hidden hover:shadow-lg transition-shadow duration-300 ">
      {/* Image Section */}
      <div className="flex justify-center items-start flex-col ">
        <div className="relative w-full h-48 md:h-full min-h-[200px] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={500}
              height={500}
              className="object-cover w-full h-full hover:scale-150 transition-all duration-300 cursor-pointer"
            />
          ) : (
            <Image
              src="/static/images/thumbnail.png"
              width={500}
              height={500}
              alt="placeholder"
              className="object-cover w-full h-full bg-gray-100"
            />
          )}
          {category && (
            <Badge className="absolute top-4 left-4 bg-darkBlue">
              {category}
            </Badge>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between p-6">
          <div>
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-2xl font-bold mb-2 line-clamp-2 flex items-center justify-between">
                {title || "Untitled Post"}
                <Link href={`/post/${id}`}>
                  <MdOutlineArrowOutward size={26} />
                </Link>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <p className="text-gray-600 mb-4 line-clamp-3">
                {truncatedContent}
              </p>

              {/* Links Section */}
              {links && links.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {links.map((link, index) => (
                    <Badge
                      key={index}
                      variant="primary"
                      className="flex items-center gap-1">
                      {/* <Link2Icon className="w-3 h-3" /> */}
                      <Link href={`${link}`}>
                        <span className="truncate max-w-[150px]">{link}</span>
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
                <time>Posted today</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BlogPost;
