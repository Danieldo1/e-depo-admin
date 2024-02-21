"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartContext } from "@/components/shop/CartWrapper";
import CartToggle from "@/components/shop/CartToggle";
import { ShoppingCart, UserRound } from "lucide-react";

const Nav = () => {
  const pathname = usePathname();
  const [showCart, setShowCart] = useState(false);
  const { cart } = useContext(CartContext);

  const inactiveLink =
    "hover:text-slate-300  relative inline-block transition-all delay-100 duration-300 ease-in-out p-2 flex gap-2";
  const activeLink =
    "text-slate-300  relative inline-block transition-all delay-100 duration-300 ease-in-out p-2 flex gap-2 after:content-[''] after:w-0 after:absolute after:h-1 after:bg-blue-800 after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out";

  if (!!showCart) {
    return (
      <CartToggle showCart={showCart} setShowCart={setShowCart} cart={cart} />
    );
  }

  return (
    <header className=" p-4 w-full  bg-[#206ef6] ">
      <div className=" container mx-auto flex justify-between items-center">
        <Link href="/" className="text1">
          LOGO
        </Link>
        <nav className="flex gap-4 text-white font-bold">
          <Link
            href="/shop"
            className={pathname === "/shop" ? activeLink : inactiveLink}
          >
            Shop <span className="hidden lg:block">All</span>
          </Link>
          <Link
            href="/categories"
            className={pathname === "/categories" ? activeLink : inactiveLink}
          >
            <span className="hidden lg:block">All</span> Categories
          </Link>
          <Link
            href="/account"
            className={pathname === "/account" ? activeLink : inactiveLink}
          >
            <span className="hidden md:block">Account</span>
            <UserRound />
          </Link>
          {/* <CartToggle showCart={showCart} setShowCart={setShowCart} cart={cart} /> */}
          <button
            onClick={() => setShowCart(true)}
            className="relative flex flex-row justify-center items-center group"
          >
            <span className="text-white hidden md:block group-hover:text-slate-300  relative  transition-all delay-100 duration-300 ease-in-out p-2  gap-2 after:content-[''] after:w-0 after:absolute after:h-1 after:bg-blue-800 after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out">
              Cart
            </span>{" "}
            <ShoppingCart className="z-50" />{" "}
            <span className="bg-white  text-[#206ef6] px-1.5 rounded-full absolute top-0 -right-2 z-40 text-sm font-semibold">
              {cart.length}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
