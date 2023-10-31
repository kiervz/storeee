import Link from "next/link";

import { FormatCurrency } from "@/app/lib/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { OrderType } from "@/types";
import DeliveryTimeline from "./delivery-timeline";
import PurchaseBy from "./purchase-by";

interface OrderDetailClientProps {
  order: OrderType;
}

const OrderDetailClient = ({ order }: OrderDetailClientProps) => {
  return (
    <>
      <div className="flex justify-normal flex-col gap-7">
        <p className="text-xl font-medium py-4">Orders details</p>
        {order && (
          <>
            <DeliveryTimeline order={order} />
            <PurchaseBy user={order.user} />
            <div>
              <p className="text-sm md:text-lg font-semibold py-4">Products</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-6/12">Items</TableHead>
                    <TableHead className="w-1/12 text-right">
                      Discount
                    </TableHead>
                    <TableHead className="w-1/12 text-right">Qty</TableHead>
                    <TableHead className="w-2/12 text-right">
                      Unit Price
                    </TableHead>
                    <TableHead className="w-2/12 text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!order.OrderItem && (
                    <TableRow>
                      <TableCell colSpan={5} className="w-full text-center">
                        No orders record.
                      </TableCell>
                    </TableRow>
                  )}
                  {order.OrderItem.map((order: any) => (
                    <TableRow key={order.id}>
                      <TableCell className="whitespace-nowrap">
                        <span>
                          {order.product.name}
                          {" - "}
                          {order.productVariation.color.name}
                          {" - "}
                          {order.productVariationSize.size.name}
                        </span>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        {order.productVariation.discount} %
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        {order.quantity}
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        {FormatCurrency(Number(order.price), "₱")}
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        {FormatCurrency(Number(order.total_price), "₱")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderDetailClient;
