"use client";

import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const AccountPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <div>
        <div>AccountPage1</div>
        <div>{session.user.name}</div>
        <div>{session.user.email}</div>
      </div>
    )
  }

  return (
<div className="bg-[#fafafa] p-5 h-screen">
  <h2 className="text-4xl font-bold text-gray-800">You are not logged in</h2>
  <p className="text-gray-600">
    Please log in to access your account.
  </p>
  <div className="mt-4 flex justify-center gap-4 items-center">
    <button
    onClick={() => router.push('/signup')}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
      >
      Sign up
    </button>
    <p className="text-gray-600 mt-4">or</p>
    {/* <button
     
     onClick={() => signIn('credentials', { callbackUrl: '/' })}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
    >
      Log in
    </button> */}
  </div>
</div>
  )
};

export default AccountPage;
