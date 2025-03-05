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
  const { title, content, imageUrl, publicId, author, category, links } =
    await req.json();

  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        imageUrl,
        publicId,
        author,
        category,
        links,
      },
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.log(error);
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

  const {id} =  await params;

  try {
    const post = await prisma.post.delete({ where: { id } });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error deleting post" });
  }
}
