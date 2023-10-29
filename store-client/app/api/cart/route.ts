import { NextResponse } from "next/server";

import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/get-current-user";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const carts = await prisma.cart.findMany({
      where: {
        userId: user.id,
        status: "active",
      },
      include: {
        product: {
          include: {
            category: true,
            brand: true,
          },
        },
        productVariation: {
          include: {
            color: true,
            ProductVariationImage: true,
          },
        },
        productVariationSize: {
          include: {
            size: true,
          },
        },
      },
    });

    return NextResponse.json(carts);
  } catch (error) {
    console.log("[CART_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const { productId, productVariationId, sizeId } = await req.json();

    const variation = await prisma.productVariation.findUnique({
      where: {
        id: productVariationId,
        productId,
      },
      include: {
        product: true,
      },
    });

    if (!variation) {
      return new NextResponse("Product not found.", { status: 404 });
    }

    const variationSize = await prisma.productVariationSize.findFirst({
      where: {
        product_variationId: productVariationId,
        sizeId,
      },
    });

    if (!variationSize) {
      return new NextResponse("Product variation size not found.", {
        status: 404,
      });
    }

    const checkCart = await prisma.cart.findFirst({
      where: {
        userId: user.id,
        productId: variation.product.id,
        product_variationId: variation.id,
        product_variation_sizeId: variationSize?.id,
        status: "active",
      },
    });

    if (checkCart) {
      if (variationSize?.quantity === checkCart.quantity) {
        return new NextResponse(
          `Sorry, only ${variationSize.quantity} quantities of this product are currently available.`,
          { status: 400 }
        );
      }

      if (checkCart.quantity === 10) {
        return new NextResponse("Sorry, you have reached the quantity limit.", {
          status: 400,
        });
      }

      await prisma.cart.update({
        where: {
          id: checkCart.id,
        },
        data: {
          quantity: checkCart.quantity + 1,
        },
      });
    } else {
      await prisma.cart.create({
        data: {
          userId: user.id,
          productId: variation.product.id,
          product_variationId: variation.id,
          product_variation_sizeId: variationSize.id,
          quantity: 1,
          status: "active",
        },
      });
    }

    const totalCartItems = await prisma.cart.count({
      where: {
        userId: user.id,
        status: "active",
      },
    });

    return NextResponse.json({ totalCartItems });
  } catch (error) {
    console.log("[CART_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const { cartId } = await req.json();

    await prisma.cart.delete({
      where: {
        id: cartId,
      },
    });

    const carts = await prisma.cart.findMany({
      where: {
        userId: user.id,
        status: "active",
      },
      include: {
        product: {
          include: {
            category: true,
            brand: true,
          },
        },
        productVariation: {
          include: {
            color: true,
            ProductVariationImage: true,
          },
        },
        productVariationSize: {
          include: {
            size: true,
          },
        },
      },
    });

    return NextResponse.json(carts);
  } catch (error) {
    console.log("[CART_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
