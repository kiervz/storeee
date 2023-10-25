import React from "react";

const HamburgerMenu = ({
  setShowMenu,
}: {
  setShowMenu: (value: boolean) => void;
}) => {
  return (
    <div
      onClick={() => setShowMenu(true)}
      className="w-6 h-5 flex flex-col justify-between items-center md:hidden text-4xl text-black cursor-pointer overflow-hidden group"
    >
      <span className="w-full h-[3px] bg-black inline-flex transform group-hover:translate-x-2 transition-all ease-in-out duration-300"></span>
      <span className="w-full h-[3px] bg-black inline-flex transform translate-x-3 group-hover:translate-x-0 transition-all ease-in-out duration-300"></span>
      <span className="w-full h-[3px] bg-black inline-flex transform translate-x-1 group-hover:translate-x-3 transition-all ease-in-out duration-300"></span>
    </div>
  );
};

export default HamburgerMenu;
