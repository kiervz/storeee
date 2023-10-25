import prisma from "@/app/lib/prismadb";
import { redirect } from "next/navigation";
import UpdateProductClient from "../../components/add-update-product-client";

const UpdateProductPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
      deleted_at: {
        equals: null,
      },
    },
    include: {
      ProductVariation: {
        where: {
          deleted_at: {
            equals: null,
          },
        },
        include: {
          ProductVariationSize: true,
          ProductVariationImage: true,
        },
      },
    },
  });

  if (!product) {
    redirect("/products");
  }

  type Size = {
    id: string;
    variationSizeId: string;
    colorId: string;
    sizeId: string;
    quantity: number;
  };

  const allSizes: Size[] = [];

  product.ProductVariation.forEach((variation) => {
    variation.ProductVariationSize.forEach(async (size) => {
      const productVariation = await prisma.productVariation.findUnique({
        where: { id: size.product_variationId },
      });

      const colorId = productVariation?.colorId || "";

      const sizeObj: Size = {
        id: size.id,
        variationSizeId: size.id,
        colorId,
        sizeId: size.sizeId,
        quantity: size.quantity,
      };

      allSizes.push(sizeObj);
    });
  });

  const formattedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    categoryId: product.categoryId,
    brandId: product.brandId,
    variations: product.ProductVariation.map((variation) => ({
      id: variation.id,
      variationId: variation.id,
      colorId: variation.colorId,
      sku: variation.sku,
      unit_price: Number(variation.unit_price),
      discount: Number(variation.discount),
      actual_price: Number(variation.actual_price),
      images: variation.ProductVariationImage.map((image) => image.name),
    })),
    variationSizes: allSizes,
  };

  const brands = await prisma.brand.findMany();
  const categories = await prisma.category.findMany();
  const colors = await prisma.color.findMany();
  const sizes = await prisma.size.findMany({
    include: {
      category: true,
    },
  });
  const currentSizes = await prisma.size.findMany({
    where: {
      categoryId: product.categoryId,
    },
    include: {
      category: true,
    },
  });

  return (
    <UpdateProductClient
      product={formattedProduct}
      brands={brands}
      categories={categories}
      colors={colors}
      sizes={sizes}
      productCategorySizes={currentSizes}
    />
  );
};

export default UpdateProductPage;
