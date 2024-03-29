import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/get-current-user";
import OrderDetailClient from "./_components/client";

const OrderPage = async ({ params }: { params: { id: string } }) => {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }

  const order = await prisma.order.findUnique({
    where: {
      id: params.id,
      userId: user.id,
    },
    include: {
      OrderItem: {
        include: {
          product: true,
          productVariation: {
            include: {
              color: true,
            },
          },
          productVariationSize: {
            include: {
              size: true,
            },
          },
        },
      },
      OrderRefund: true,
    },
  });
  return <OrderDetailClient order={JSON.parse(JSON.stringify(order))} />;
};

export default OrderPage;
