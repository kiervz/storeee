import prisma from "@/app/lib/prismadb";
import ShopClient from "./components/client";

export const dataByPrice = [
  { id: "all-price", value: [0, 10000000], label: "All Prices" },
  { id: "under-3k", value: [0, 3000], label: "Under ₱ 3,000" },
  { id: "from-3k-to-6k", value: [3001, 6000], label: "₱ 3,001 - ₱ 6,000" },
  { id: "from-6k-to-12k", value: [6001, 12000], label: "₱ 6,001 - ₱ 12,000" },
  { id: "over-12k", value: [12001, 10000000], label: "Over 12,000" },
];

export const dataSaleOffers = [{ value: "sale", label: "Sale" }];

export const sortsData = [
  { value: "latest-arrival", label: "Latest Arrival" },
  { value: "featured", label: "Featured" },
  { value: "high-low", label: "Price: High Low" },
  { value: "low-high", label: "Price: Low High" },
];

interface SearchParamsProps {
  searchParams: {
    orderBy: "latest-arrival" | "featured" | "high-low" | "low-high";
    page: string;
    search: string;
    category: [] | string;
    brand: [] | string;
    color: [] | string;
    saleOffer: [] | string;
    price: string;
  };
}

const page = async ({ searchParams }: SearchParamsProps) => {
  const {
    search,
    page: paramPage,
    orderBy,
    category,
    brand,
    price,
    saleOffer,
    color,
  } = searchParams;

  const page = parseInt(paramPage) || 1;
  const pageSize = 10;

  const where = {
    is_post: true,
    deleted_at: null,
    AND: [] as any,
  };

  if (search) {
    where.AND.push({
      OR: [{ slug: { contains: search } }, { name: { contains: search } }],
    });
  }

  if (brand) {
    where.AND.push({
      brand: {
        slug: { in: typeof brand === "string" ? [brand] : brand },
      },
    });
  }

  if (category) {
    where.AND.push({
      category: {
        slug: { in: typeof category === "string" ? [category] : category },
      },
    });
  }

  if (color) {
    where.AND.push({
      ProductVariation: {
        some: {
          color: {
            slug: { in: typeof color === "string" ? [color] : color },
          },
        },
      },
    });
  }

  if (saleOffer === "sale") {
    where.AND.push({
      OR: [
        {
          ProductVariation: {
            some: {
              discount: { gt: 0 },
            },
          },
        },
        {
          ProductVariation: {
            every: {
              discount: { lte: 0 },
            },
          },
        },
      ],
    });
  }

  if (price) {
    const priceRange = dataByPrice.find((item) => item.id === price);

    where.AND.push({
      ProductVariation: {
        some: {
          AND: [
            { actual_price: { gte: priceRange?.value[0] } },
            { actual_price: { lte: priceRange?.value[1] } },
          ],
        },
      },
    });
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: orderBy === "latest-arrival" ? { created_at: "desc" } : {},
    include: {
      brand: true,
      category: true,
      _count: {
        select: { ProductVariation: true },
      },
      ProductVariation: {
        include: {
          color: true,
          ProductVariationSize: true,
          ProductVariationImage: true,
        },
      },
    },
    take: 10,
  });

  if (orderBy === "low-high") {
    products.sort((a, b) => {
      const priceA = a.ProductVariation.reduce(
        (minPrice, variation) =>
          Math.min(minPrice, Number(variation.actual_price)),
        Number.MAX_VALUE
      );
      const priceB = b.ProductVariation.reduce(
        (minPrice, variation) =>
          Math.min(minPrice, Number(variation.actual_price)),
        Number.MAX_VALUE
      );
      return priceA - priceB;
    });
  } else if (orderBy === "high-low") {
    products.sort((a, b) => {
      const priceA = a.ProductVariation.reduce(
        (maxPrice, variation) =>
          Math.max(maxPrice, Number(variation.actual_price)),
        Number.MIN_VALUE
      );
      const priceB = b.ProductVariation.reduce(
        (maxPrice, variation) =>
          Math.max(maxPrice, Number(variation.actual_price)),
        Number.MIN_VALUE
      );
      return priceB - priceA;
    });
  }

  const categories = await prisma.category.findMany();
  const brands = await prisma.brand.findMany();
  const colors = await prisma.color.findMany();

  return (
    <ShopClient
      categories={categories}
      brands={brands}
      colors={colors}
      products={JSON.parse(JSON.stringify(products))}
    />
  );
};

export default page;
