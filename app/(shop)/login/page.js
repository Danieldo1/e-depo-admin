"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

const AdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logging, setLogging] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogging(true);
    await signIn("credentials", { email, password, callbackUrl: "/" });
    setLogging(false);
  };
  return (
    <section className="h-[70%] bg-[#fafafa] w-screen">
      <h1 className="text-3xl font-bold text-center mt-10">Login</h1>
      <form
        className="max-w-md mx-auto my-10 h-full flex flex-col"
        onSubmit={handleSubmit}
        method="POST"
        
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          disabled={logging}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 border-gray-300 bg-gray-200 block w-full my-4 rounded-lg disabled:bg-gray-700"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          disabled={logging}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 border-gray-300 bg-gray-200 block w-full my-4 rounded-lg disabled:bg-gray-700"
        />
        <button
          type="submit"
          disabled={logging}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full w-full disabled:bg-gray-700 disabled:cursor-not-allowed"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default AdminPage;
