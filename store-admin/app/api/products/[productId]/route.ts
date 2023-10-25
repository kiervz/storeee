import { NextResponse } from "next/server";
import slugify from "slugify";

import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const body = await req.json();

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: {
        categoryId: body.categoryId,
        brandId: body.brandId,
        name: body.name,
        slug: slugify(body.name, {
          lower: true,
        }),
        description: body.description,
      },
    });

    if (!product) {
      return new NextResponse("Product not found.", { status: 404 });
    }

    let variationIds: string[] = [];
    body.variations.map(async (item: any) => {
      if (item.variationId) {
        variationIds.push(item.variationId);

        const variation = await prisma.productVariation.findUnique({
          where: {
            id: item.variationId,
          },
        });

        await prisma.productVariationImage.deleteMany({
          where: {
            product_variationId: item.variationId,
          },
        });

        item.images.map(async (image: string) => {
          await prisma.productVariationImage.create({
            data: {
              product_variationId: item.variationId,
              name: image,
            },
          });
        });

        if (variation) {
          const discountedPrice = item.unit_price * (item.discount / 100);

          await prisma.productVariation.update({
            where: {
              id: item.variationId,
            },
            data: {
              colorId: item.colorId,
              sku: item.sku,
              unit_price: item.unit_price,
              discount: item.discount,
              actual_price: item.unit_price - discountedPrice,
            },
          });
        }
      } else {
        const discountedPrice = item.unit_price * (item.discount / 100);

        const variation = await prisma.productVariation.create({
          data: {
            productId: params.productId,
            colorId: item.colorId,
            sku: item.sku,
            unit_price: item.unit_price,
            discount: item.discount,
            actual_price: item.unit_price - discountedPrice,
          },
        });

        item.images.map(async (image: string) => {
          await prisma.productVariationImage.create({
            data: {
              product_variationId: variation.id,
              name: image,
            },
          });
        });
      }
    });

    if (variationIds.length > 0) {
      await prisma.productVariation.updateMany({
        where: {
          id: {
            notIn: variationIds,
          },
        },
        data: {
          deleted_at: new Date(),
        },
      });
    }

    let variationSizeIds: string[] = [];
    body.variationSizes.map(async (item: any) => {
      if (item.variationSizeId) {
        variationSizeIds.push(item.variationSizeId);

        const variationSize = await prisma.productVariationSize.findUnique({
          where: {
            id: item.variationSizeId,
          },
        });

        if (variationSize) {
          await prisma.productVariationSize.update({
            where: {
              id: item.variationSizeId,
            },
            data: {
              product_variationId: variationSize.product_variationId,
              sizeId: item.sizeId,
              quantity: item.quantity,
            },
          });
        }
      } else {
        const vary = await prisma.productVariation.findFirst({
          where: {
            productId: product.id,
            colorId: item.colorId,
          },
        });

        if (vary) {
          await prisma.productVariationSize.create({
            data: {
              product_variationId: vary.id,
              sizeId: item.sizeId,
              quantity: item.quantity,
            },
          });
        }
      }
    });

    if (variationSizeIds.length > 0) {
      await prisma.productVariationSize.updateMany({
        where: {
          id: {
            notIn: variationSizeIds,
          },
        },
        data: {
          deleted_at: new Date(),
        },
      });
    }

    return NextResponse.json({
      message: "Product updated successfully!",
      data: product,
    });
  } catch (error) {
    console.error("[PRODUCT_PATCH_BY_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    await prisma.product.update({
      where: {
        id: params.productId,
        deleted_at: {
          equals: null,
        },
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return NextResponse.json({
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.log("[PRODUCT_DELETE_BY_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
