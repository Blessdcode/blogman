import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import BlogPost from "@/components/blogpost";
import { TPost } from "@/types/types";
// import { authOptions } from "../utils/authOptions";

const getPosts = async (email: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`);
    const { posts } = await res.json();
    return posts;
  } catch (error) {
    console.log(error, "something went wrong")
    
    return null;

  }
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let posts = [];

  if (!session) {
    redirect("/");
  }

  if (email) {
    posts = await getPosts(email);
    console.log(posts)
  }

  return (
    <div>
      <h1>My Posts</h1>

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
  );
}
