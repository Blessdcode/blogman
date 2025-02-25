import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// For Next.js dynamic routes in App Router
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ catName: string }> | { catName: string } }
) {
  try {
    // Handle both Promise and non-Promise params
    const params =
      "then" in context.params ? await context.params : context.params;
    const catName = params.catName;

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
