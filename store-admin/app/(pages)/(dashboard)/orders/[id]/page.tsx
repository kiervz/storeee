import prisma from "@/app/lib/prismadb";
import OrderDetailClient from "./_components/client";

const OrderPage = async ({ params }: { params: { id: string } }) => {
  const order = await prisma.order.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: true,
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
