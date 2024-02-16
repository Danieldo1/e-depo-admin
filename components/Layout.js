"use client";

import Navbar from "@/components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();

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
    <main className="bg-blue-900 min-h-screen w-screen flex ">
      <Navbar />
      <h2 className="bg-white p-5 flex-grow rounded-md">{children}</h2>
    </main>
  );
}