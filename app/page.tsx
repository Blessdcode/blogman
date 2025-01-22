import HeadingModel from "@/components/heading";
import BlogPost from "@/components/blogpost";
// import Post from "@/data/data";
import CategoriesList from "@/components/categoriesList";

import { TPost } from "@/types/types";

const getPost = async (): Promise<TPost[] | null> => {
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

export default async function Home() {
  const Post = await getPost();
  console.log(Post, "post");
  return (
    <div className="p-3 md:p-0">
      <CategoriesList />

      <HeadingModel title="THE BLOG" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:my-16 my-6">
        {Post &&
          Post.map((post: TPost) => (
            <BlogPost
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author.name}
              authorEmail={post.authorEmail}
              imageUrl={post.imageUrl}
              links={post.links || []}
              category={post.catName}
              date={post.createdAt}
            />
          ))}
      </div>
    </div>
  );
}
