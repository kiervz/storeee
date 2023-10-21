import { Category, Size } from "@prisma/client";

import prisma from "@/app/lib/prismadb";
import Pagination from "@/app/components/pagination";
import SizeTable from "./components/size-table";
import ToolBar from "./components/toolbar";

interface ColumnsProps {
  label: string;
  value: keyof Size;
  isSort: boolean;
  className?: string;
}

interface SearchParamsProps {
  searchParams: {
    orderBy: keyof Size;
    sort: "desc" | "asc";
    page: string;
  };
}

const CategoryPage = async ({ searchParams }: SearchParamsProps) => {
  const columns: ColumnsProps[] = [
    { label: "Category", value: "categoryId", isSort: true },
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

  const sizes = await prisma.size.findMany({
    orderBy: {
      [searchParams.orderBy]: searchParams.sort,
    },
    include: {
      category: true,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const sizeCount = await prisma.size.count();

  return (
    <div className="flex justify-normal flex-col gap-4">
      <ToolBar />
      <SizeTable columns={columns} sizes={sizes} searchParams={searchParams} />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={sizeCount}
      />
    </div>
  );
};

export default CategoryPage;
