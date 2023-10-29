"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Cart } from "@/types";
import { cn } from "@/app/lib/utils";
import { Button, buttonVariants } from "@/app/components/ui/button";
import Container from "@/app/components/container";
import Summary from "./summary";
import CartItem from "./cart-item";

interface CartClientInterface {
  carts: Cart[];
  totalAmount: number;
}

const CartClient = ({ carts, totalAmount }: CartClientInterface) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);

  const handleFavourite = () => {
    console.log("favourite");
  };

  const handleTrash = async (id: string) => {
    await axios.delete("/api/cart", {
      data: {
        cartId: id,
      },
    });

    router.refresh();
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);

    try {
      const { data } = await axios.post("/api/cart/checkout", {
        cartIds: carts.map((cart) => cart.id),
      });

      router.push(data.url);
      router.refresh();
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleCanceled = async (sessionId: string) => {
    try {
      await axios.delete("/api/cart/canceled", {
        data: {
          sessionId,
        },
      });

      router.push("/carts");
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
      handleCanceled(searchParams.get("canceled") ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      {carts.length === 0 ? (
        <div className=" py-24">
          <div className="flex justify-normal items-center flex-col gap-10">
            <Image
              className=" w-96 rounded-lg p-4 mx-auto"
              src="/images/empty-cart.png"
              alt="emptyCart"
              width={100}
              height={100}
              sizes="100vw"
              quality={100}
              priority
            />
            <div className="flex justify-normal items-center flex-col">
              <h1 className="text-2xl font-medium">Your cart is empty</h1>
              <p>{"Looks like you haven't added anything to your cart yet."}</p>
            </div>
            <Link
              href="/shop"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Continue shopping
            </Link>
          </div>
        </div>
      ) : (
        <>
          <p className="text-2xl mb-6">Cart</p>
          <div className="flex justify-normal items-start flex-col md:flex-row gap-6 relative">
            {carts && (
              <>
                <div className="w-full md:w-8/12">
                  <CartItem
                    handleFavourite={handleFavourite}
                    handleTrash={handleTrash}
                    carts={carts}
                  />
                </div>
                <div className="w-full md:w-4/12 sticky top-16">
                  <Summary
                    handleCheckout={handleCheckout}
                    isCheckingOut={isCheckingOut}
                    totalAmount={totalAmount}
                  />
                </div>
              </>
            )}
          </div>
          <div className="block md:hidden p-8 border w-full fixed bottom-0 left-0 bg-white">
            <Button
              variant="default"
              size="lg"
              className="w-full rounded-full h-12 text-md"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartClient;
