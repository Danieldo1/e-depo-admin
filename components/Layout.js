"use client";

import Navbar from "@/components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu } from "lucide-react";
import {useState} from "react"

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);



  if (!session) {
    return (
      <main className="bg-blue-200 w-screen h-[100vh] overflow-hidden ">
        <div className="flex flex-col justify-center items-center pt-10 px-5">
          <h2 className="text-3xl font-bold text-center mb-5">
            Welcome back to e-depo admin dashboard
          </h2>
          <h3 className="text-xl font-bold text-center">
            Please login to continue
          </h3>
        </div>
        <div className="flex flex-col justify-start items-center h-full mt-24">
          <div className="flex gap-4">
            <button
              onClick={() => signIn("google")}
              className="bg-blue-500 text-white p-4 rounded-lg items-center hover:bg-blue-600 text-xl"
            >
              Login
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-stone-900 min-h-screen w-screen flex py-2 ">
      <Navbar showMenu={showMenu} />
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={
          (showMenu === true ? "hidden" : "fixed") + " top-3 left-2 md:hidden"
        }
      >
        <Menu className="w-8 h-8 text-blue-500 text-2xl" />
      </button>
      <div
        className={
          "bg-gray-300 p-10 md:p-12 lg:p-14 xl:p-18 w-full flex-grow rounded-md max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-full mx-auto" +
          (showMenu === true ? "bg-black opacity-60" : "")
        }
        onClick={() => setShowMenu(false)}
      >
        {children}
      </div>
    </main>
  );
}
