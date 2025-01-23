import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/utils/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { title, content, imageUrl, publicId, author, category, links } =
    await req.json();

  const authorEmail = session?.user?.email as string;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required." },
      { status: 500 }
    );
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        publicId,
        author,
        catName: category,
        links,
        authorEmail,
      },
    });
    console.log(newPost, "post created");
    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.log(err);
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
