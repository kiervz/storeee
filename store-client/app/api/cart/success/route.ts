import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  const order = await prisma.order.findFirst({
    where: {
      sessionId: sessionId ?? "",
    },
  });

  if (order && order.status === "paid") {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false });
}
