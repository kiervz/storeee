import { NextResponse } from "next/server";

import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/get-current-user";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    const user = await getCurrentUser();

    if (!orderId) {
      return new NextResponse("Order ID not found.", { status: 400 });
    }

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
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

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_ITEM_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
