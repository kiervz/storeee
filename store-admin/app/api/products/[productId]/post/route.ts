import { NextResponse } from "next/server";

import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const { is_post } = await req.json();
    const { productId } = params;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return new NextResponse("Product not found.", { status: 404 });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        is_post,
      },
    });

    return NextResponse.json({
      message: `Product is now ${
        updatedProduct.is_post ? "posted" : "unposted"
      }`,
    });
  } catch (error) {
    console.error("[PRODUCT_POST_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
