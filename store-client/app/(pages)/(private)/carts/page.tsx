import getCurrentUser from "@/app/actions/get-current-user";
import prisma from "@/app/lib/prismadb";
import { notFound } from "next/navigation";
import CartClient from "./_components/client";

const CartPage = async () => {
  const user = await getCurrentUser();

  if (!user) return notFound();

  const carts = await prisma.cart.findMany({
    where: {
      userId: user.id,
      status: "active",
    },
    include: {
      product: {
        include: {
          category: true,
          brand: true,
        },
      },
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

  let calculatedTotalAmount: number = 0;

  if (carts) {
    calculatedTotalAmount = carts.reduce((accumulator, product) => {
      return (
        Number(accumulator) +
        Number(product.productVariation.actual_price) * product.quantity
      );
    }, 0);
  }

  return (
    <CartClient
      carts={JSON.parse(JSON.stringify(carts))}
      totalAmount={calculatedTotalAmount}
    />
  );
};

export default CartPage;
