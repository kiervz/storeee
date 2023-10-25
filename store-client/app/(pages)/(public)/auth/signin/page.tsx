import type { Metadata } from "next";

import AuthForm from "./components/auth-form";
import Container from "@/app/components/container";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <Container>
      <div className="py-16 items-center justify-center grid">
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
    </Container>
  );
};

export default Login;
