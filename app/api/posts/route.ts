/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/utils/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { title, content, imageUrl, publicId, category, links, catName } =
      await req.json();
    const authorEmail = session.user.email as string; 

    if (!title || !content || !catName) {
      return NextResponse.json(
        { error: "Title, content, and category are required." },
        { status: 400 }
      );
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        publicId,
        author: { connect: { email: authorEmail } }, 
        category: { connect: { catName } }, 
        links,
      },
    });

    console.log(newPost, "post created");
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
