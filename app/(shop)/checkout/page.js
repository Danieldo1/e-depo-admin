"use client";

import React, { useContext, useEffect, useState } from "react";
import { ArrowRightCircle } from "lucide-react";
import { CartContext } from "@/components/shop/CartWrapper";
import Link from "next/link";

const CartPage = () => {
  const { cart } =  useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if(cart.length > 0){
      fetchProducts();
    }
  }, [cart]);  
 const fetchProducts = async () => {
   try {
     setLoading(true);
     const response = await fetch(`/api/cart?ids=${cart.join(",")}`);
     if (response.ok) {
       const data = await response.json();
       setCartItems(data);
       setLoading(false);
     } else {
       console.error("Failed to fetch products");
     }
   } catch (error) {
     console.error("Error fetching products:", error);
   }
 };
  return (
    <>
      <h1 className="text-4xl font-bold bg-[#f5f5f5] px-5 text1">Checkout</h1>
      <div className="grid grid-cols-[1.2fr_.8fr]  md:gap-10 lg:gap-40   w-full h-full bg-[#b8b7b7]">
        <div className="bg-[#f5f5f5] rounded-bl-lg md:rounded-b-lg h-3/4">
          <div className="p-5 flex flex-col justify-around h-full">
            <h3 className="text-xl font-bold">Cart Details</h3>
            {!cart?.length && (
              <div className="flex flex-col justify-center items-center h-full mt-5">
                <p className="text-gray-500">Cart is empty</p>
                <p className="text-gray-500">Please add some items</p>
                <img src="/empty-cart.png" alt="empty-cart" />
                <p className="text-gray-500">to your cart</p>
                <Link
                  href={"/shop"}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg mt-5"
                >
                  Shop Now
                </Link>
              </div>
            )}
            {cartItems?.length > 0 && (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b border-gray-300 py-3"
                  >{item.title}</div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="bg-[#f5f5f5] rounded-br-lg md:rounded-b-lg h-3/4">
          <div className="p-5 flex flex-col justify-around h-full">
            <h3 className="text-xl font-bold">Order Summary</h3>

            <div className="space-y-4">
              <label>Your Details</label>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <input
                  className="w-full p-2 border border-gray-300 rounded-md mb-4 md:mb-0"
                  placeholder="First Name"
                />
                <input
                  className="w-full p-2 border border-gray-300 rounded-md mb-0"
                  placeholder="Last Name"
                />
              </div>

              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Email"
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Phone"
              />

              <div className="flex flex-col md:flex-row md:space-x-4">
                <input
                  className="w-full p-2 border border-gray-300 rounded-md mb-4 md:mb-0"
                  placeholder="City"
                />
                <input
                  className="w-full p-2 border border-gray-300 rounded-md mb-0"
                  placeholder="Zip Code"
                />
              </div>

              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Address"
              />
            </div>
            <div className="flex items-center justify-around -mt-5 md:mt-0 h-full">
              <input
                type="checkbox"
                id="termsAndConditions"
                className="mr-2 md:mr-0 md:mb-0 h-5 w-5"
              />
              <label htmlFor="termsAndConditions" className="text-sm md:mb-1">
                Agree to{" "}
                <a href="/terms" className="text-blue-500">
                  Terms and Conditions
                </a>
              </label>
            </div>

            {!cart.length > 0 ? (
              <button
                type="submit"
                className={
                  "bg-gray-500 text-white font-bold px-4 py-2 rounded-lg items-center flex gap-2 mt-4 hover:bg-gray-600 cursor-not-allowed"
                }
                disabled
              >
                Payment <ArrowRightCircle />
              </button>
            ) : (
              <button
                type="submit"
                className={
                  "bg-blue-500 text-white font-bold px-4 py-2 rounded-lg items-center flex gap-2 mt-4 hover:bg-blue-600"
                }
              >
                Payment <ArrowRightCircle />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
