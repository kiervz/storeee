import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/app/lib/utils";
import { LayoutDashboard } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

const links = [
  { id: 1, name: "Dashboard", link: "/", icon: LayoutDashboard },
  { id: 2, name: "Products", link: "/products", icon: LayoutDashboard },
  { id: 3, name: "Brands", link: "/brands", icon: LayoutDashboard },
  { id: 4, name: "Categories", link: "/categories", icon: LayoutDashboard },
  { id: 5, name: "Colors", link: "/colors", icon: LayoutDashboard },
  { id: 6, name: "Sizes", link: "/sizes", icon: LayoutDashboard },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  });

  return (
    <aside
      ref={sidebar}
      className={cn(
        "absolute left-0 top-0 z-[99] flex h-screen w-[18.5rem] flex-col overflow-y-hidden bg-primary duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-6 lg:py-6">
        <Link href="/">
          <div className="flex justify-between gap-2 w-full">
            <p className="text-white text-lg">KVEY Store</p>
          </div>
        </Link>

        <button
          ref={trigger}
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-slate-500">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {links.map((link) => {
                const questionMarkIndex = link.link.indexOf("?");
                const pathnameBeforeQuestionMark =
                  questionMarkIndex !== -1
                    ? link.link.substring(0, questionMarkIndex)
                    : link.link;

                const IconComponent = link.icon;

                return (
                  <li key={link.id}>
                    <Link
                      href={link.link}
                      className={cn(
                        "group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-slate-200 duration-300 ease-in-out hover:bg-[#333A48] dark:hover:bg-meta-4",
                        pathname === pathnameBeforeQuestionMark &&
                          "bg-[#333A48]"
                      )}
                    >
                      <IconComponent size={22} />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
