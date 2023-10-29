"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import * as z from "zod";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Button } from "@/app/components/ui/button";
import SelectReason from "./select-reason";

const formSchema = z.object({
  reason: z.string().min(1, "The reason is required."),
});

interface CancelOrderFormProps {
  orderId: string;
  setIsOpenCancel: (value: boolean) => void;
  setIsCancelOrder: (value: boolean) => void;
}

const CancelOrderForm: React.FC<CancelOrderFormProps> = ({
  orderId,
  setIsOpenCancel,
  setIsCancelOrder,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await axios.post(`/api/orders/${orderId}/cancel`, {
        reason: values.reason,
      });
      toast.success("Order has been canceled!");
      setIsOpenCancel(false);
      setIsCancelOrder(true);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Cancel order</DialogTitle>
        <DialogDescription>
          {`Refunds take 5-10 days to appear on a customer's statement. 
            Stripe's fees for the original payment won't be returned,
            but there are no additional fees for the refund.`}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-normal flex-col items-start gap-4"
        >
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <div className="w-full">
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <SelectReason />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <div className="flex justify-normal items-start gap-2 ml-auto">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setIsOpenCancel(false);
              }}
              disabled={isLoading}
            >
              Close
            </Button>
            <Button type="submit" disabled={isLoading}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CancelOrderForm;
