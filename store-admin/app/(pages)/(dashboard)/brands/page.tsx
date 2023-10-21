import { Brand } from "@prisma/client";

import prisma from "@/app/lib/prismadb";
import Pagination from "@/app/components/pagination";
import BrandTable from "./components/brand-table";
import ToolBar from "./components/toolbar";

interface ColumnsProps {
  label: string;
  value: keyof Brand;
  isSort: boolean;
  className?: string;
}

interface SearchParamsProps {
  searchParams: {
    orderBy: keyof Brand;
    sort: "desc" | "asc";
    page: string;
  };
}

const BrandPage = async ({ searchParams }: SearchParamsProps) => {
  const columns: ColumnsProps[] = [
    { label: "Name", value: "name", isSort: true },
    { label: "Slug", value: "slug", isSort: true },
    {
      label: "Date",
      value: "created_at",
      isSort: true,
      className: "w-2/12",
    },
  ];

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const brands = await prisma.brand.findMany({
    orderBy: {
      [searchParams.orderBy]: searchParams.sort,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const brandCount = await prisma.brand.count();

  return (
    <div className="flex justify-normal flex-col gap-4">
      <ToolBar />
      <BrandTable
        columns={columns}
        brands={brands}
        searchParams={searchParams}
      />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={brandCount}
      />
    </div>
  );
};

export default BrandPage;
