import React from "react";
import { XIcon } from "lucide-react";

const CartToggle = ({ showCart, setShowCart }) => {
  if (!showCart) return null;

  return (
    <aside className="fixed top-0 right-0 w-3/4 h-full flex flex-col gap-4 max-w-sm p-4 bg-[#f5f5f5] border border-gray-200 rounded-lg shadow sm:p-6 md:p-8  z-50">
      <button
        onClick={() => setShowCart(false)}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  absolute right-2 top-2"
      >
        <XIcon className="w-5 h-5" />
      </button>

      <h3 className="text-xl font-bold text-gray-900 ">Shopping Cart</h3>
      <p>product</p>
      <p>product</p>
      <p>product</p>
      <p>product</p>
      <p>product</p>
      <p>product</p>
      <p>product</p>
      <p>product</p>
      <p>product</p>
      <p>product</p>
      <h3>Total</h3>
    </aside>
  );
};

export default CartToggle;
