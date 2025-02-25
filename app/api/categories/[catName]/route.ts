import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Use the correct type for the context parameter in Next.js app router
export async function GET(
  request: NextRequest,
  context: { params: { catName: string } }
) {
  try {
    const { catName } = context.params;

    const category = await prisma.category.findUnique({
      where: { catName },
      include: {
        posts: {
          include: { author: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Could not fetch category" },
      { status: 500 }
    );
  }
}
