"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

import Container from "@/app/components/container";
import { buttonVariants } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import { Check } from "lucide-react";

const Thankyou = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const validateCheckoutSuccess = async () => {
    try {
      const { data } = await axios.get(
        `/api/cart/success?sessionId=${searchParams.get("sessionId")}`
      );

      if (data.success) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
        router.push("/shop");
      }
    } catch (error: any) {
      setIsSuccess(false);
      router.push("/shop");
    }
  };

  useEffect(() => {
    validateCheckoutSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    isSuccess && (
      <Container>
        <div className="flex justify-center items-center flex-col gap-10 my-10">
          <Check className="text-green-600" size={100} />
          <div className="flex justify-normal items-center flex-col gap-3">
            <p className="text-6xl">Thank you!</p>
            <p className="text-2xl">Your order was completed successfully.</p>
          </div>
          <Link
            href="/shop"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Continue shopping
          </Link>
        </div>
      </Container>
    )
  );
};

export default Thankyou;
