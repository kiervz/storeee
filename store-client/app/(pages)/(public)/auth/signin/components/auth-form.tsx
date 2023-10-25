"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
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
        is_admin: false,
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
      router.push(searchParams.get("callbackUrl") ?? "/");
    }
  }, [router, searchParams, status]);

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
            <Button type="submit" disabled={isLoading}>
              Sign In
            </Button>
          </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <div className="flex justify-normal flex-col gap-4">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() =>
            signIn("google", {
              callbackUrl: searchParams.get("callbackUrl") ?? "/",
            })
          }
        >
          Sign in with Google
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={() =>
            signIn("github", {
              callbackUrl: searchParams.get("callbackUrl") ?? "/",
            })
          }
        >
          Sign in with Github
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
