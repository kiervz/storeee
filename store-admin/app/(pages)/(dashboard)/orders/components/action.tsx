"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { Order } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";
import { AlertModal } from "@/app/components/ui/alert-modal";

const OrderAction = ({ order }: { order: Order }) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/orders/${order.id}`, {
        status,
      });
      toast.success("Order has been updated!");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <AlertModal
          title="Are you sure you want to update status?"
          description="This action cannot be undone."
          btnVariant="default"
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onConfirm}
          loading={loading}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push(`/orders/${order.id}`)}>
            View order details
          </DropdownMenuItem>
          {order.delivery_status === "to_pack" && (
            <DropdownMenuItem
              onClick={() => {
                setOpen(true);
                setStatus("packed");
              }}
            >
              Status: Packed
            </DropdownMenuItem>
          )}
          {order.delivery_status === "packed" && (
            <DropdownMenuItem
              onClick={() => {
                setOpen(true);
                setStatus("shipped");
              }}
            >
              Status: Shipped
            </DropdownMenuItem>
          )}
          {order.delivery_status === "shipped" && (
            <DropdownMenuItem
              onClick={() => {
                setOpen(true);
                setStatus("delivered");
              }}
            >
              Status: Delivered
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default OrderAction;
