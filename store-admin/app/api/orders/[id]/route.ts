import { NextResponse } from "next/server";

import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }

  const order = await prisma.order.findUnique({
    where: {
      id: params.id,
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
      user: true,
    },
  });

  return NextResponse.json(order);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const body = await req.json();
    const { status } = body;

    if (!status) {
      return new NextResponse("Status is required", { status: 400 });
    }

    let data: any;

    if (status === "packed") {
      data = {
        delivery_status: "packed",
        packed_at: new Date(),
      };
    } else if (status === "shipped") {
      data = {
        delivery_status: "shipped",
        shipped_at: new Date(),
      };
    } else if (status === "delivered") {
      data = {
        delivery_status: "delivered",
        delivered_at: new Date(),
      };
    }

    const order = await prisma.order.update({
      where: {
        id: params.id,
      },
      data,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_PUT]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
