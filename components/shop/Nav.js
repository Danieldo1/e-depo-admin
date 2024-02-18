"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();

  const inactiveLink =
    "hover:text-slate-300  relative inline-block transition-all delay-100 duration-300 ease-in-out p-2 flex gap-2";
  const activeLink =
    "text-slate-300  relative inline-block transition-all delay-100 duration-300 ease-in-out p-2 flex gap-2 after:content-[''] after:w-0 after:absolute after:h-1 after:bg-blue-800 after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out";

  return (
    <header className=" p-4 w-full  bg-[#206ef6]">
      <div className=" container mx-auto flex justify-between items-center">
        <Link href="/" className="text1">
          LOGO
        </Link>
        <nav className="flex gap-4 text-white font-bold">
          <Link
            href="/shop"
            className={pathname === "/shop" ? activeLink : inactiveLink}
          >
            Shop
          </Link>
          <Link
            href="/categories"
            className={pathname === "/categories" ? activeLink : inactiveLink}
          >
            Categories
          </Link>
          <Link
            href="/account"
            className={pathname === "/account" ? activeLink : inactiveLink}
          >
            Account
          </Link>
          <Link
            href="/cart"
            className={pathname === "/cart" ? activeLink : inactiveLink}
          >
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
