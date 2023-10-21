import { NextResponse } from "next/server";
import slugify from "slugify";

import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const body = await req.json();
    const { name, categoryId } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category name is required", { status: 400 });
    }

    const sizedata = await prisma.size.findFirst({
      where: {
        categoryId,
        slug: slugify(name, {
          lower: true,
        }),
      },
    });

    if (sizedata) {
      return new NextResponse("Size name already exist.", { status: 400 });
    }

    const size = await prisma.size.create({
      data: {
        name,
        slug: slugify(name, {
          lower: true,
        }),
        categoryId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const sizes = await prisma.size.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
