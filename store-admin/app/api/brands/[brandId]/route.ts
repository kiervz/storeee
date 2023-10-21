import { NextResponse } from "next/server";
import slugify from "slugify";

import prismadb from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(
  req: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const brand = await prismadb.brand.delete({
      where: {
        id: params.brandId,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { brandId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.brandId) {
      return new NextResponse("Brand id is required", { status: 400 });
    }

    const brand = await prismadb.brand.update({
      where: {
        id: params.brandId,
      },
      data: {
        name,
        slug: slugify(name, {
          lower: true,
        }),
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.log("[BRAND_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
