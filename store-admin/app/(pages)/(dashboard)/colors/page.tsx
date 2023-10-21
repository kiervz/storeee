import { Color } from "@prisma/client";

import prisma from "@/app/lib/prismadb";
import Pagination from "@/app/components/pagination";
import ColorTable from "./components/color-table";
import ToolBar from "./components/toolbar";

interface ColumnsProps {
  label: string;
  value: keyof Color;
  isSort: boolean;
  className?: string;
}

interface SearchParamsProps {
  searchParams: {
    orderBy: keyof Color;
    sort: "desc" | "asc";
    page: string;
  };
}

const ColorPage = async ({ searchParams }: SearchParamsProps) => {
  const columns: ColumnsProps[] = [
    { label: "Name", value: "name", isSort: true },
    { label: "Slug", value: "slug", isSort: true },
    { label: "Color", value: "hexValue", isSort: false },
    {
      label: "Date",
      value: "created_at",
      isSort: true,
      className: "w-2/12",
    },
  ];

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const colors = await prisma.color.findMany({
    orderBy: {
      [searchParams.orderBy]: searchParams.sort,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const colorCount = await prisma.color.count();

  return (
    <div className="flex justify-normal flex-col gap-4">
      <ToolBar />
      <ColorTable
        columns={columns}
        colors={colors}
        searchParams={searchParams}
      />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={colorCount}
      />
    </div>
  );
};

export default ColorPage;
