import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  email: string;
}

export async function GET(
  request: NextRequest,
  context: { params: RouteParams }
) {
  try {
    const { email } = context.params;
    console.log("Email received:", email);
    const posts = await prisma.user.findUnique({
      where: { email },
      include: {
        post: { orderBy: { createdAt: "desc" } },
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not fetch post" });
  }
}
