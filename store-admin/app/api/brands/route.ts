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
    const { name } = body;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const brand = await prisma.brand.create({
      data: {
        name,
        slug: slugify(name, {
          lower: true,
        }),
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRANDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
