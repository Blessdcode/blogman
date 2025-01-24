import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { email: string } }
) {
  try {
    const { params } = context; // Extract params from context
    const { email } = params; // Destructure email from params
    console.log("Email received:", email);

    const userWithPosts = await prisma.user.findUnique({
      where: { email },
      include: {
        post: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!userWithPosts) {
      return NextResponse.json(
        { message: "User not found", posts: [] },
        { status: 404 }
      );
    }

    return NextResponse.json({ posts: userWithPosts.post });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Could not fetch posts" },
      { status: 500 }
    );
  }
}
