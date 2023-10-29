import { cache } from "react";
import { notFound } from "next/navigation";
import prisma from "@/app/lib/prismadb";

import ProductClient from "./client";

interface ProductProps {
  params: { slug: string };
}
const fetchProduct = cache((slug: string) =>
  prisma.product.findFirst({
    where: {
      slug,
      is_post: true,
      deleted_at: {
        equals: null,
      },
    },
    include: {
      brand: true,
      category: true,
      _count: {
        select: { ProductVariation: true },
      },
      ProductVariation: {
        include: {
          color: true,
          ProductVariationSize: {
            include: {
              size: true,
            },
          },
          ProductVariationImage: true,
        },
      },
    },
  })
);

export async function generateMetadata({ params }: ProductProps) {
  const product = await fetchProduct(params.slug);

  if (!product) return notFound();

  return {
    title: product.name,
    description: product.description,
  };
}

const Page = async ({ params }: ProductProps) => {
  const product = await fetchProduct(params.slug);

  if (!product) return notFound();

  const sizes = await prisma.size.findMany({
    where: {
      categoryId: product.categoryId,
    },
  });

  return (
    <ProductClient
      product={JSON.parse(JSON.stringify(product))}
      sizes={sizes}
    />
  );
};

export default Page;
