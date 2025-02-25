import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: Promise<{ catName: string }>
) {
  try {
    const { catName } = await params;
    const posts = await prisma.category.findUnique({
      where: { catName },
      include: {
        posts: { include: { author: true }, orderBy: { createdAt: "asc" } },
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not fetch post" });
  }
}
