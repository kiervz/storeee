"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { DeliveryStatus } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface DeliveryStatusProps {
  label: string;
  value?: DeliveryStatus;
}

const deliveryStatuses: DeliveryStatusProps[] = [
  { label: "All" },
  { label: "To-Pack", value: "to_pack" },
  { label: "Packed", value: "packed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const StatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let status = searchParams.get("status");

  return (
    <div className="flex items-center space-x-4 w-auto">
      <p className="text-sm text-muted-foreground">Status</p>
      <Select
        onValueChange={(status) => {
          const query = status ? `?status=${status}` : "";
          router.push(`/orders${query}`);
        }}
        defaultValue={status ?? "ALL"}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filter by status..." />
        </SelectTrigger>
        <SelectContent>
          {deliveryStatuses.map((status) => (
            <SelectItem key={status.label} value={status.value || "ALL"}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StatusFilter;
