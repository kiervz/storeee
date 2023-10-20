import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

import { buttonVariants } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";
import AuthForm from "./components/auth-form";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <>
      <div className="container relative h-full items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "block md:hidden absolute left-4 top-4 md:right-8 md:top-8"
          )}
        >
          Kvey Store
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link href="/">Kvey Store</Link>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to login your account.
              </p>
            </div>
            <AuthForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
