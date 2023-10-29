import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/app/lib/stripe";
import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/actions/get-current-user";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const { cartIds } = await req.json();

  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }

  if (!cartIds || cartIds.length === 0) {
    return new NextResponse("Cart ids are required", { status: 400 });
  }

  const carts = await prisma.cart.findMany({
    where: {
      id: {
        in: cartIds,
      },
    },
    include: {
      product: true,
      productVariation: {
        include: {
          color: true,
          ProductVariationImage: true,
        },
      },
      productVariationSize: {
        include: {
          size: true,
        },
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let totalAmount = 0;

  carts.forEach((cart) => {
    totalAmount +=
      cart.productVariation.actual_price.toNumber() * cart.quantity;

    line_items.push({
      quantity: cart.quantity,
      price_data: {
        currency: "PHP",
        product_data: {
          name: cart.product.name,
          images: [cart.productVariation.ProductVariationImage[0].name],
          description: `Size: ${cart.productVariationSize.size.name} - Color: ${cart.productVariation.color.name}`,
        },
        unit_amount: cart.productVariation.actual_price.toNumber() * 100,
      },
    });
  });

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      status: "paid",
      total_amount: totalAmount,
      type: "stripe",
      sessionId: "",
    },
  });

  carts.forEach(async (cart) => {
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: cart.product.id,
        product_variationId: cart.productVariation.id,
        product_variation_sizeId: cart.productVariationSize.id,
        price: cart.productVariation.actual_price,
        quantity: cart.quantity,
        total_price: Number(cart.productVariation.actual_price) * cart.quantity,
      },
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: user.email ?? "",
    success_url: `http://${req.headers.get(
      "host"
    )}/thankyou?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://${req.headers.get(
      "host"
    )}/carts?canceled={CHECKOUT_SESSION_ID}`,
    metadata: {
      orderId: order.id,
    },
  });

  await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      sessionId: session.id,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
