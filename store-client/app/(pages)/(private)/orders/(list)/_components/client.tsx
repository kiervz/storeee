"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { Order } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  DeliveryStatus,
  FormatCurrency,
  FormatDateTime,
  FormatString,
} from "@/app/lib/format";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import CancelOrderForm from "./cancel-order-form";
import Container from "@/app/components/container";

interface ColumnsProps {
  label: string;
  value: keyof Order;
  isSort: boolean;
  className?: string;
}

interface SearchParamsProps {
  columns: ColumnsProps[];
  searchParams: {
    orderBy: keyof Order;
    sort: "desc" | "asc";
    page: string;
  };
  orders: Order[];
}

const OrderClient = ({ columns, searchParams, orders }: SearchParamsProps) => {
  const router = useRouter();
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const [isCancelOrder, setIsCancelOrder] = useState<boolean>(false);

  const copyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Copied order ID");
  };

  useEffect(() => {
    if (isCancelOrder) {
      setIsCancelOrder(false);
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCancelOrder]);

  return (
    <Container>
      <p className="text-xl font-medium py-4">Orders</p>
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
                {DeliveryStatus(order)}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {FormatString(order.type.toLowerCase())}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">
                {FormatCurrency(Number(order.total_amount), "₱")}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => copyOrderId(order.id)}>
                      Copy order ID
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        router.push(`/orders/${order.id}`);
                      }}
                    >
                      View order details
                    </DropdownMenuItem>
                    {order.status !== "cancelled" && !order.packed_at && (
                      <>
                        <DropdownMenuSeparator />
                        <Dialog open={isOpenCancel}>
                          <DialogTrigger
                            onClick={() => {
                              setIsOpenCancel(true);
                            }}
                            className="relative flex w-full hover:bg-accent cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          >
                            Cancel
                          </DialogTrigger>
                          <DialogContent>
                            <CancelOrderForm
                              orderId={order.id}
                              setIsOpenCancel={setIsOpenCancel}
                              setIsCancelOrder={setIsCancelOrder}
                            />
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default OrderClient;
