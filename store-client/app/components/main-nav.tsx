"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/app/lib/utils";

interface CategoryProps {
  name: string;
  url: string;
}

const categories: Array<CategoryProps> = [
  {
    name: "Shop",
    url: "/shop",
  },
  // { name: 'Men', url: '/shop/men' },
  // { name: 'Women', url: '/shop/women' },
  // { name: 'Kids', url: '/shop/kids' },
];

const MainNav = () => {
  const pathname = usePathname();

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {categories.map((category: CategoryProps) => (
        <Link
          key={category.url}
          href={category.url}
          className={cn(
            "text-sm transition-colors hover:text-black",
            category.url === pathname
              ? "text-black font-medium"
              : "text-slate-500"
          )}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
