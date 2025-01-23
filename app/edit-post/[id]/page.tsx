import { authOptions } from "@/app/utils/authOptions";
import EditPostForm from "@/components/edit-post";
import { TPost } from "@/types/types";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const getPost = async (): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
      cache: "no-store",
    });

    if (res.ok) {
        const post = await res.json();
        console.log(post,"fetched")
      return post;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default async function EditPost({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }


  const { id } = params;
  const posts = await getPost();
  const post = posts?.find((p: TPost) => p.id === id);

  console.log(post)

  return <>{post ? <EditPostForm post={post} /> : <div>No Found Post</div>}</>;
}
