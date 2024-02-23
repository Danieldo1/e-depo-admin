"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const AccountPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchUser( session?.user?.email);
}, [session]);

const fetchUser = async () => {
  await fetch(`api/register?id=${session?.user?.email}`)
    .then((res) => res.json())
    .then((data) => {
      setUserInfo(data[0]);
      setLoading(false);
    });
};

if(loading){
  return (
    <div className="bg-[#fafafa] p-5 h-screen">
      <h2 className="text-4xl font-bold text-gray-800">Loading...</h2>
    </div>
  )
}

  if (session) {
    return (
      <div className="bg-[#fafafa] p-5 h-[70%]">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-bold text-gray-800">Welcome, {userInfo && userInfo.email.split("@")[0]}</h2>
        <button
          onClick={() => signOut()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded "
          >
          Log out
        </button>

        </div>
        <div>
          <button>Wishlist</button>
          <button>Orders</button> 
        </div>
          {JSON.stringify(userInfo)}
      </div>
    );
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
    <button
     
     onClick={() => router.push('/login')}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
    >
      Log in
    </button>
  </div>
</div>
  )
};

export default AccountPage;
