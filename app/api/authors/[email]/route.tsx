import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// interface NextContext {
//   params: { email: string };
// }

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params;
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
