import { notFound } from "next/navigation";
import { Order } from "@prisma/client";

import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/get-current-user";
import Pagination from "@/app/components/pagination";
import OrderClient from "./_components/client";

interface ColumnsProps {
  label: string;
  value: keyof Order;
  isSort: boolean;
  className?: string;
}

interface SearchParamsProps {
  searchParams: {
    orderBy: keyof Order;
    sort: "desc" | "asc";
    page: string;
  };
}

const OrderPage = async ({ searchParams }: SearchParamsProps) => {
  const user = await getCurrentUser();

  if (!user) return notFound();

  const columns: ColumnsProps[] = [
    { label: "Date", value: "created_at", isSort: true, className: "w-4/12" },
    { label: "Status", value: "status", isSort: true, className: "w-1/12" },
    {
      label: "Delivery Status",
      value: "delivery_status",
      isSort: false,
      className: "w-3/12",
    },
    { label: "Method", value: "type", isSort: false, className: "w-1/12" },
    {
      label: "Amount",
      value: "total_amount",
      isSort: true,
      className: "w-2/12 text-right",
    },
  ];

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      [searchParams.orderBy]: searchParams.sort,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const orderCount = await prisma.order.count();

  return (
    <>
      <OrderClient
        orders={JSON.parse(JSON.stringify(orders))}
        columns={columns}
        searchParams={searchParams}
      />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={orderCount}
      />
    </>
  );
};

export default OrderPage;
