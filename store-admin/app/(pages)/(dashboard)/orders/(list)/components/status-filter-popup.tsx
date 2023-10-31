"use client";

import { Filter } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useState } from "react";
import { cn } from "@/app/lib/utils";
import { DeliveryStatus } from "@prisma/client";

interface DeliveryStatusProps {
  label: string;
  value: DeliveryStatus;
}

const deliveryStatuses: DeliveryStatusProps[] = [
  { label: "To-Pack", value: "to_pack" },
  { label: "Packed", value: "packed" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const StatusFilterPopup = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deliveryStatus, setDeliveryStatus] = useState<string>("");

  return (
    <div>
      <Button
        className="relative"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Filter className="mr-2 h-5" />
        Filter
      </Button>
      <Card
        className={cn("w-[350px] z-10 absolute shadow-lg", {
          hidden: !isOpen,
          block: isOpen,
        })}
      >
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Filter Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-3">
                <Label htmlFor="deliveryStatus">Delivery Status</Label>
                <Select
                  onValueChange={(deliveryStatus) =>
                    setDeliveryStatus(deliveryStatus)
                  }
                >
                  <SelectTrigger id="deliveryStatus">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {deliveryStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button>Apply</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StatusFilterPopup;
