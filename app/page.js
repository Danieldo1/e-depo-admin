'use client'

import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  if(!session) return null;
  return (
<Layout>
  <div className="text-blue-900 flex justify-between items-center">
    <h1 className="text-xl font-bold ">Hello {session?.user?.name}</h1>
    <img src={session?.user?.image} alt="" className="w-10 h-10 rounded-full ml-4" />
  </div>
</Layout>
  );
}
