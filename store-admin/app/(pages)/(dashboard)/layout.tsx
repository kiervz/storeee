import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import DashboardLayout from "@/app/components/dashboard-layout";

interface LayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
