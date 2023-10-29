import { NextResponse } from "next/server";

import { stripe } from "@/app/lib/stripe";
import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/get-current-user";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    const { reason } = await req.json();

    if (!orderId) {
      return new NextResponse("Order ID not found.", { status: 400 });
    }

    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId ?? "",
        userId: user.id,
      },
    });

    if (!order) {
      return new NextResponse("Order not found.", { status: 404 });
    }

    const retrieve = await stripe.checkout.sessions.retrieve(order.sessionId);

    if (!retrieve) {
      return new NextResponse("Session not found.", { status: 404 });
    }

    const cancelReason = await prisma.cancelReason.findFirst({
      where: {
        code: reason,
      },
    });

    if (!cancelReason) {
      return new NextResponse("Cancel Reason not found.", { status: 404 });
    }

    const orderRefund = await prisma.orderRefund.create({
      data: {
        orderId: order.id,
        cancel_reasonId: cancelReason.id,
        reason: cancelReason.name,
        amount: order.total_amount,
        refundId: "",
      },
    });

    const refund = await stripe.refunds.create({
      payment_intent: retrieve.payment_intent as string,
      reason: "requested_by_customer",
    });

    if (!refund) {
      return new NextResponse("Something went wrong.", { status: 500 });
    }

    await prisma.orderRefund.update({
      where: {
        id: orderRefund.id,
      },
      data: {
        refundId: refund.id,
      },
    });

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: "cancelled",
        cancel_at: new Date(),
      },
    });

    return new NextResponse("Order has been canceled!", { status: 200 });
  } catch (error) {
    console.log("[ORDER_CANCEL_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
