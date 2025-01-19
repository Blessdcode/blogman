import HeadingModel from "@/components/heading";
import BlogPost from "@/components/blogpost";
import Post from "@/data/data";
import { TPost } from "@/types/types";

export default function Home() {
  return (
    <div className="p-3 md:p-0">
      <HeadingModel title="THE BLOG" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:my-16 my-6">
        {Post &&
          Post.map((post: TPost) => (
            <BlogPost
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              imageUrl={post.imageUrl}
              links={post.links || []}
              category={post.category}
            />
          ))}
      </div>
    </div>
  );
}
