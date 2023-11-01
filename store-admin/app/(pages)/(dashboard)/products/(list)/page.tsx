import { Product } from "@prisma/client";

import prisma from "@/app/lib/prismadb";
import Pagination from "@/app/components/pagination";
import ProductTable from "../components/product-table";
import ToolBar from "../components/toolbar";
import delay from "delay";

interface ColumnsProps {
  label: string;
  value: keyof Product;
  isSort: boolean;
  className?: string;
}

interface SearchParamsProps {
  searchParams: {
    orderBy: keyof Product;
    sort: "desc" | "asc";
    page: string;
  };
}

const ProductPage = async ({ searchParams }: SearchParamsProps) => {
  const columns: ColumnsProps[] = [
    { label: "Name", value: "name", isSort: true },
    { label: "Category", value: "categoryId", isSort: true },
    { label: "Brand", value: "brandId", isSort: true },
    { label: "Post", value: "is_post", isSort: false },
    { label: "Variations", value: "slug", isSort: false },
    {
      label: "Date",
      value: "created_at",
      isSort: true,
      className: "w-2/12",
    },
  ];

  let orderBy = {};

  if (searchParams.orderBy === "categoryId") {
    orderBy = {
      category: { name: searchParams.sort },
    };
  } else if (searchParams.orderBy === "brandId") {
    orderBy = {
      brand: { name: searchParams.sort },
    };
  } else {
    orderBy = {
      [searchParams.orderBy]: searchParams.sort,
    };
  }

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const products = await prisma.product.findMany({
    where: {
      deleted_at: {
        equals: null,
      },
    },
    include: {
      category: true,
      brand: true,
      ProductVariation: {
        where: {
          deleted_at: {
            equals: null,
          },
        },
      },
      _count: {
        select: {
          ProductVariation: {
            where: {
              deleted_at: {
                equals: null,
              },
            },
          },
        },
      },
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const productCount = await prisma.product.count();
  await delay(4000);
  return (
    <div className="flex justify-normal flex-col gap-4">
      <ToolBar />
      <ProductTable
        columns={columns}
        products={JSON.parse(JSON.stringify(products))}
        searchParams={searchParams}
      />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={productCount}
      />
    </div>
  );
};

export default ProductPage;
