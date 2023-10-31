import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { FormatCurrency, FormatDateTime, FormatString } from "@/app/lib/format";
import { Order } from "@prisma/client";
import { DeliveryStatus } from "@/app/components/delivery-status";
import OrderAction from "./action";
import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ColumnsProps {
  label: string;
  value: keyof Order;
  isSort: boolean;
  className?: string;
}

interface OrderTableProps {
  columns: ColumnsProps[];
  searchParams: {
    orderBy: keyof Order;
    sort: "desc" | "asc";
  };
  orders: Order[];
}

const OrderTable = ({ columns, searchParams, orders }: OrderTableProps) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.value} className={column.className}>
                {column.isSort ? (
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: column.value,
                        sort: searchParams.sort === "desc" ? "asc" : "desc",
                      },
                    }}
                  >
                    {column.label}
                    {column.value === searchParams.orderBy &&
                      (searchParams.sort === "desc" ? (
                        <ArrowUp className="inline h-4" />
                      ) : (
                        <ArrowDown className="inline h-4" />
                      ))}
                  </Link>
                ) : (
                  column.label
                )}
              </TableHead>
            ))}
            <TableHead className="w-1/12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="w-full text-center">
                No orders record.
              </TableCell>
            </TableRow>
          )}

          {orders.map((order: Order) => (
            <TableRow key={order.id}>
              <TableCell className="whitespace-nowrap">
                {FormatDateTime(order.created_at.toString())}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {FormatString(order.status.toLowerCase())}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <DeliveryStatus order={order} />
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {FormatString(order.type.toLowerCase())}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">
                {FormatCurrency(Number(order.total_amount), "₱")}
              </TableCell>
              <TableCell>
                <OrderAction order={order} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default OrderTable;
