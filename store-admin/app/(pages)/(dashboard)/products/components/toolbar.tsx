"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button, buttonVariants } from "@/app/components/ui/button";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

const ToolBar = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Link
          className={cn("ml-auto", buttonVariants({ variant: "default" }))}
          href="products/add"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Link>
      </div>
    </>
  );
};

export default ToolBar;
