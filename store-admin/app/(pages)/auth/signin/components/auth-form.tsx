"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";

const formSchema = z.object({
  email: z
    .string({
      required_error: "The email is required",
    })
    .email()
    .min(5)
    .nonempty(),
  password: z
    .string()
    .min(6, { message: "The password must be at least 6 characters(s)" }),
});

const AuthForm = () => {
  const router = useRouter();
  const { status } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>("");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const data = await signIn("credentials", {
        email: values.email,
        password: values.password,
        is_admin: true,
        redirect: false,
        callbackUrl: "/",
      });

      if (!data || data.ok !== true || data.error !== null) {
        setError(data?.error);
      } else {
        router.refresh();
      }
    } catch (error: any) {
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="grid gap-6">
      {error && <small className="text-red-500">{error}</small>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-normal text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-normal text-xs" />
                </FormItem>
              )}
            />
            <Button disabled={isLoading}>Sign In</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
