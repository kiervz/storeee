import { NextResponse } from "next/server";

import prismadb from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const sizes = await prismadb.size.findMany({
      where: {
        categoryId: params.categoryId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZE_GET_BY_CATEGORYID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
