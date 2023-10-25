"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "next-auth";
import {
  Heart,
  HelpCircle,
  Package2,
  ShoppingBag,
  X,
  Settings,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";

import { cn } from "@/app/lib/utils";
import { buttonVariants } from "@/app/components/ui/button";
// import { useStore } from "../store/useStore";
import UserDropdown from "./user-dropdown";
import HamburgerMenu from "./ui/hamburger-menu";

const categories = [
  {
    name: "Shop",
    url: "/shop",
  },
  // { name: "Men", url: "/shop/men" },
  // { name: "Women", url: "/shop/women" },
  // { name: "Kids", url: "/shop/kids" },
];

const navOptions = [
  {
    name: "Favorites",
    url: "/favorites",
    icon: <Heart size={24} absoluteStrokeWidth />,
  },
  {
    name: "Cart",
    url: "/carts",
    icon: <ShoppingBag size={24} absoluteStrokeWidth />,
  },
  {
    name: "Orders",
    url: "/orders",
    icon: <Package2 size={24} absoluteStrokeWidth />,
  },
  {
    name: "Account Settings",
    url: "/settings",
    icon: <Settings size={24} absoluteStrokeWidth />,
  },
  {
    name: "Help",
    url: "/help",
    icon: <HelpCircle size={24} absoluteStrokeWidth />,
  },
];

interface NavbarActionsProps {
  showMenu: boolean;
  setShowMenu: (isShowMenu: boolean) => void;
  user: Pick<User, "name" | "image" | "email"> | null;
}

const NavbarActions: React.FC<NavbarActionsProps> = ({
  showMenu,
  setShowMenu,
  user,
}) => {
  const [totalCartItems, setTotalCartItems] = useState<number>(0);

  return (
    <div className="ml-auto flex items-center gap-x-3">
      {user ? (
        <>
          <Link
            href="/carts"
            className={cn(
              buttonVariants({
                className:
                  "relative flex item-center rounded-full bg-black px-3",
              })
            )}
          >
            <ShoppingBag size={20} color="white" />
            <span className="ml-1 text-sm font-medium text-white">
              {totalCartItems}
            </span>
          </Link>
          <UserDropdown user={user} />
          <HamburgerMenu setShowMenu={setShowMenu} />
          <AnimatePresence>
            {showMenu && (
              <div className="absolute md:hidden top-0 right-0 w-full h-screen bg-gray-700 bg-opacity-50 flex flex-col items-end z-[60] overflow-hidden">
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.2 }}
                  exit={{ x: "100%" }}
                  className="w-full xs:w-[70%] sm:w-[50%] bg-white h-full shadow-lg flex flex-col items-center px-4 py-10 relative z-[99] overflow-y-auto"
                >
                  <motion.div
                    animate={{ rotate: [180, 0, 0] }}
                    className="text-black cursor-pointer absolute top-4 right-4"
                  >
                    <X
                      onClick={() => setShowMenu(false)}
                      strokeWidth="2.25"
                      size={32}
                    />
                  </motion.div>
                  <ul className="list-none w-full mt-4 px-2">
                    <li className="py-2 flex justify-normal gap-2">
                      <UserIcon size={24} strokeWidth="2.2" />
                      Hi, Kiervey
                    </li>
                  </ul>
                  <ul className="list-none w-full my-8 px-2">
                    {categories.map((data) => (
                      <Link key={data.url} href={data.url} className="text-lg">
                        <li className="py-2" onClick={() => setShowMenu(false)}>
                          {data.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                  <ul className="list-none w-full mt-5 px-2">
                    {navOptions.map((data) => (
                      <Link
                        key={data.url}
                        href={data.url}
                        className="flex justify-normal items-center gap-2"
                      >
                        {data.icon}
                        <li className="py-2" onClick={() => setShowMenu(false)}>
                          {data.name}
                        </li>
                      </Link>
                    ))}
                  </ul>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          href="/auth/signin"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default NavbarActions;
