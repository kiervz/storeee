import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function DELETE(req: Request) {
  const { sessionId } = await req.json();

  const order = await prisma.order.findFirst({
    where: {
      sessionId,
      status: "cancelled",
    },
  });

  if (order) {
    await prisma.orderItem.deleteMany({
      where: {
        orderId: order.id,
      },
    });

    await prisma.order.delete({
      where: {
        id: order.id,
      },
    });
  }

  return NextResponse.json({ success: true });
}
