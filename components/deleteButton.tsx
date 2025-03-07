/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const deleteImage = async (publicId: string) => {
    const res = await fetch("/api/removeImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmed) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (res.ok) {
            const post = await res.json();
            const { publicId } = post;
            await deleteImage(publicId);
            
            toast.success("Post deleted successfully");
            router.refresh();
            console.log("Post deleted");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <Button onClick={handleDelete} className="text-red-600">
      Delete post
    </Button>
  );
}
