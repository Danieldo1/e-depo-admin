'use client'

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
    const pathname = usePathname();

  const inactiveLink = " hover:bg-slate-500 hover:text-white rounded-md p-2 flex gap-2";
  const activeLink = " bg-slate-500 text-white rounded-md p-2 flex gap-2";
  return (
    <header className="flex justify-between items-center p-4 w-full  ">
      <Link href="/" className="text1">LOGO</Link>
      <nav className="flex gap-4">
        <Link href="/shop" className={pathname === "/shop" ? activeLink : inactiveLink}>Shop</Link>
        <Link href="/categories" className={pathname === "/categories" ? activeLink : inactiveLink}>Categories</Link>
        <Link href="/account" className={pathname === "/account" ? activeLink : inactiveLink}>Account</Link>
        <Link href="/cart" className={pathname === "/cart" ? activeLink : inactiveLink}>Cart</Link>
      </nav>
    </header>
  );
};

export default Nav;
