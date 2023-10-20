"use client";

import { Order } from "@prisma/client";
import { Badge } from "@/app/components/ui/badge";

export const DeliveryStatus = ({ order }: { order: Order }) => {
  if (order.delivered_at != null) {
    return <Badge variant="success">Delivered</Badge>;
  } else if (order.shipped_at != null) {
    return <Badge variant="blue">Shipped</Badge>;
  } else if (order.packed_at != null) {
    return <Badge variant="default">Packed</Badge>;
  } else {
    if (order.status === "cancelled") {
      return <Badge variant="destructive">Cancelled</Badge>;
    }
    return <Badge variant="outline">To Pack</Badge>;
  }
};
