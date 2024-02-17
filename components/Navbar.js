import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  PackageOpen,
  CandlestickChart,
  UserCog,
  Layers3,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Navbar = ({ showMenu }) => {
  const pathname = usePathname();
  const router = useRouter();

  const inactiveLink =
    " hover:bg-stone-500 hover:text-black rounded-md p-2 flex gap-2";
  const activeLink = " bg-stone-500 text-black rounded-md p-2 flex gap-2";
  
  return (
    <aside
      className={
        (showMenu === true
          ? "fixed bg-stone-900 h-full z-50 w-[60%]  "
          : "hidden") + " md:flex flex-col p-5 text-white transition-all duration-300 ease-in-out  "
      }
    >
      <Link href="/" className="flex gap-2 mb-4">
        LOGO
      </Link>

      <nav className="flex gap-2 flex-col ">
        <Link href="/" className={pathname === "/" ? activeLink : inactiveLink}>
          {" "}
          <LayoutDashboard />
          Dashboard
        </Link>
        <Link
          href="/products"
          className={pathname.includes("/products") ? activeLink : inactiveLink}
        >
          {" "}
          <CandlestickChart />
          Products
        </Link>
        <Link
          href="/category"
          className={pathname.includes("/category") ? activeLink : inactiveLink}
        >
          {" "}
          <Layers3 />
          Category
        </Link>
        <Link
          href="/orders"
          className={pathname.includes("/orders") ? activeLink : inactiveLink}
        >
          {" "}
          <PackageOpen />
          Orders
        </Link>
        <Link
          href="/settings"
          className={pathname.includes("/settings") ? activeLink : inactiveLink}
        >
          {" "}
          <UserCog />
          Settings
        </Link>
      </nav>
      <div className="w-full flex  ">
        <button
          onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL })}
          className="mt-10 bg-red-500 w-full text-white p-2 rounded-lg items-center flex gap-2 hover:bg-red-600"
        >
          <LogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Navbar;
