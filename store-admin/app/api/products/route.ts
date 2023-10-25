import { NextResponse } from 'next/server';
import slugify from 'slugify';

import prisma from '@/app/lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const body = await req.json();

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: await createUniqueSlug(body.name),
        description: body.description,
        categoryId: body.categoryId,
        brandId: body.brandId,
      },
    });

    const variationPromises = body.variations.map(async (variation: any) => {
      const pVariation = await prisma.productVariation.create({
        data: {
          productId: product.id,
          colorId: variation.colorId,
          sku: variation.sku,
          unit_price: variation.unit_price,
          discount: variation.discount,
          actual_price: variation.actual_price,
        },
      });

      const imagePromises = variation.images.map(async (image: string) => {
        await prisma.productVariationImage.create({
          data: {
            product_variationId: pVariation.id,
            name: image,
          },
        });
      });

      await Promise.all(imagePromises);
    });
    
    await Promise.all(variationPromises);

    const variationSizePromises = body.variationSizes.map(
      async (variationSize: any) => {
        
        const productVariation = await prisma.productVariation.findFirst({
          where: {
            productId: product.id,
            colorId: variationSize.colorId,
          },
        });
        
        if (productVariation) {
          await prisma.productVariationSize.create({
            data: {
              product_variationId: productVariation.id,
              sizeId: variationSize.sizeId,
              quantity: variationSize.quantity,
            },
          });
        }
      }
    );
    
    await Promise.all(variationSizePromises);

    return NextResponse.json({
      message: 'Product added successfully!',
      data: product,
    });
  } catch (error) {
    console.error('[COLOR_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

const createUniqueSlug = async (name: string) => {
  let slug = slugify(name, { lower: true });
  let slugIsUnique = false;
  let count = 1;

  while (!slugIsUnique) {
    const existingProduct = await prisma.product.findFirst({
      where: {
        slug,
      },
    });

    if (!existingProduct) {
      slugIsUnique = true;
    } else {
      slug = slugify(`${name}-${count}`, { lower: true });
      count++;
    }
  }

  return slug;
}