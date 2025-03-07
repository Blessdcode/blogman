/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/utils/authOptions";
// import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({ where: { id } });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;

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

    const newPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        imageUrl,
        publicId,
        category: { connect: {  catName } },
        links,
      },
    });

    console.log(newPost, "post updated");
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const post = await prisma.post.delete({ where: { id } });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error deleting post" });
  }
}
