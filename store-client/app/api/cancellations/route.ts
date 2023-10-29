import { NextResponse } from "next/server";

import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/get-current-user";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const cancellations = await prisma.cancelReason.findMany();

    return NextResponse.json(cancellations);
  } catch (error) {
    console.log("[CANCELLATIONS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
