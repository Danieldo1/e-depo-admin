"use client";

import Navbar from "@/components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu } from "lucide-react";
import {useState} from "react"
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
const router = useRouter();

  if(session && session.user){
    
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
            "bg-gray-300 p-10 md:p-12 lg:p-14 xl:p-18 w-full flex-grow rounded-md max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-full mx-auto" +
            (showMenu === true ? "bg-black opacity-60 blur-md" : "")
          }
          onClick={() => setShowMenu(false)}
        >
          {children}
        </div>
      </main>
    );
  } 
  if(session === 'undefined'){
    return router.push("/main/login");
  }
}
