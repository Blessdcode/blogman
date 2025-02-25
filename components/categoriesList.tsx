import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    catName: string;
  };
};

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        catName: params.catName,
      },
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
