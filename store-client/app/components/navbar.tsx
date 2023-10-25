"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import MainNav from "@/app/components/main-nav";
import NavbarActions from "@/app/components/navbar-actions";

const Navbar = () => {
  const session = useSession();
  const navRef = useRef<HTMLElement | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [lastScroll, setLastScroll] = useState<number>(0);
  const [currentScrollY, setScrollY] = useState<number>(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
    setLastScroll(currentScrollY);
  };

  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  return (
    <nav
      ref={navRef}
      className={`${
        currentScrollY > lastScroll
          ? "fixed top-0 transform -translate-y-full transition-transform duration-300 ease-in-out"
          : ""
      } border-b w-full bg-white shadow-md h-16 fixed top-0 z-50 transition-all ease-in-out duration-300`}
    >
      <div className="relative px-4 sm:px-6 flex h-full items-center justify-between mx-auto max-w-7xl">
        <Link href="/" className="flex gap-x-2">
          <p className="font-bold text-base md:text-lg">KVEY Store</p>
        </Link>
        <div className="hidden md:block">
          <MainNav />
        </div>
        <NavbarActions
          user={session.data?.user ?? null}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
      </div>
    </nav>
  );
};

export default Navbar;
