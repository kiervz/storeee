"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Color } from "@prisma/client";
import { useState } from "react";

import { Modal } from "@/app/components/ui/modal";
import { Input } from "@/app/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Button } from "@/app/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2),
  hexValue: z
    .string({
      required_error: "The color is required",
    })
    .min(7, "The color value is required"),
});

interface ModalColorProps {
  initialData?: Color | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalColor = ({
  initialData,
  isOpen,
  onClose,
}: ModalColorProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Edit a color." : "Add a new color";
  const toastMessage = initialData ? "Color updated." : "Color created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      hexValue: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/colors/${initialData.id}`, values);
      } else {
        await axios.post("/api/colors", values);
      }

      router.refresh();
      router.push(`/colors`);
      toast.success(toastMessage);
      onClose();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex justify-normal flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Color name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hexValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color Value</FormLabel>
                      <div className="flex justify-normal gap-4">
                        <FormControl className="w-6/12">
                          <Input
                            readOnly
                            disabled={loading}
                            placeholder="Color value"
                            {...field}
                          />
                        </FormControl>
                        <FormControl className="w-2/12">
                          <Input
                            type="color"
                            disabled={loading}
                            placeholder="Color value"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    type="button"
                    disabled={loading}
                    variant="outline"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} className="ml-auto" type="submit">
                    {action}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
