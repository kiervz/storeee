import { Category } from "@prisma/client";

import prisma from "@/app/lib/prismadb";
import Pagination from "@/app/components/pagination";
import CategoryTable from "./components/order-table";
import ToolBar from "./components/toolbar";

interface ColumnsProps {
  label: string;
  value: keyof Category;
  isSort: boolean;
  className?: string;
}

interface SearchParamsProps {
  searchParams: {
    orderBy: keyof Category;
    sort: "desc" | "asc";
    page: string;
  };
}

const CategoryPage = async ({ searchParams }: SearchParamsProps) => {
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

  const categories = await prisma.category.findMany({
    orderBy: {
      [searchParams.orderBy]: searchParams.sort,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const categoryCount = await prisma.category.count();

  return (
    <div className="flex justify-normal flex-col gap-4">
      <ToolBar />
      <CategoryTable
        columns={columns}
        categories={categories}
        searchParams={searchParams}
      />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={categoryCount}
      />
    </div>
  );
};

export default CategoryPage;
