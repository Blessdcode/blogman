import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { catName: string } } // ✅ Correct type
) {
  try {
    const { catName } = params; // ✅ params is accessed directly

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
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { message: "Could not fetch category" },
      { status: 500 }
    );
  }
}
