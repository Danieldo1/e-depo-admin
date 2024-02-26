import React from "react";

const NewsletterSignUp = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-2 text-center">
        Join our Newsletter
      </h2>
      <p className="mb-4 text-gray-600 text-center">
        Sign up to receive updates and exclusive offers.
      </p>
      <form className="flex flex-col space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
       
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignUp;
