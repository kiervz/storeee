import prisma from "@/app/lib/prismadb";
import OrderTable from "./components/order-table";
import Pagination from "@/app/components/pagination";
import ToolBar from "./components/toolbar";
import { DeliveryStatus, Order } from "@prisma/client";

import delay from "delay";

interface ColumnsProps {
  label: string;
  value: keyof Order;
  isSort: boolean;
  className?: string;
}

interface SearchParamsProps {
  searchParams: {
    status: DeliveryStatus;
    orderBy: keyof Order;
    sort: "desc" | "asc";
    page: string;
  };
}

const OrderPage = async ({ searchParams }: SearchParamsProps) => {
  const columns: ColumnsProps[] = [
    { label: "Date", value: "created_at", isSort: true, className: "w-5/12" },
    { label: "Status", value: "status", isSort: false, className: "w-1/12" },
    {
      label: "Delivery Status",
      value: "delivery_status",
      isSort: false,
      className: "w-2/12",
    },
    { label: "Method", value: "type", isSort: false, className: "w-1/12" },
    {
      label: "Amount",
      value: "total_amount",
      isSort: true,
      className: "w-2/12 text-right",
    },
  ];

  const statuses = Object.values(DeliveryStatus);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const orders = await prisma.order.findMany({
    where: {
      delivery_status: status,
    },
    orderBy: {
      [searchParams.orderBy]: searchParams.sort,
    },
    include: {
      user: true,
      OrderItem: true,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const orderCount = await prisma.order.count();

  return (
    <div className="flex justify-normal flex-col gap-4">
      <ToolBar />
      <OrderTable
        columns={columns}
        orders={JSON.parse(JSON.stringify(orders))}
        searchParams={searchParams}
      />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemCount={orderCount}
      />
    </div>
  );
};

export default OrderPage;
