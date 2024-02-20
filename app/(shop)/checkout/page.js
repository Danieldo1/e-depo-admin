"use client";

import React, { useContext, useEffect, useState } from "react";
import { ArrowRightCircle } from "lucide-react";
import { CartContext } from "@/components/shop/CartWrapper";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";

const CartPage = () => {
  const { cart, setCart, useCart, removeProduct } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (cart.length > 0) {
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

  const addQuantity = (id) => {
    useCart(id);
  };

  const removeQuantity = (id) => {
    removeProduct(id);
  };

  return (
    <>
      <h1 className="text-4xl font-bold bg-[#f5f5f5] px-5 text1 ">Checkout</h1>
      <div className="grid grid-cols-[1.2fr_.8fr]  md:gap-10 lg:gap-40   w-full h-full bg-[#b8b7b7]">
        <div className="bg-[#f5f5f5] rounded-bl-lg md:rounded-b-lg h-3/4">
          <div className="p-5 flex flex-col gap-5 h-full overflow-scroll">
            <h3 className="text-xl font-bold">Cart Details</h3>
            <div className="flex flex-row justify-between uppercase text-gray-500 text-sm ">
              <label>Product</label>
              <label className="ml-40">Quantity</label>
              <label> Price</label>
            </div>
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
            {loading === true && (
              <div className="p-5 flex flex-col gap-5 h-full overflow-scroll">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 animate-pulse bg-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="animate-pulse bg-gray-400 h-16 w-16 rounded-lg"></div>
                        <div className="skeleton-box bg-gray-400 h-8 w-full rounded"></div>
                      </div>
                      <div>
                        <p className="skeleton-box bg-gray-400 h-8 w-24 rounded"></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {loading === false && cartItems?.length > 0 && (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.images[0] || "/noimage.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-lg font-bold">{item.title}</h3>
                          <p className="text-gray-500 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="md:flex md:items-center md:space-x-4">
                        <button
                          onClick={() => removeQuantity(item._id)}
                          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                        >
                          <Minus />
                        </button>
                        <p className="text-center">{cart.filter((id) => id === item._id).length}</p>
                        <button
                          onClick={() => addQuantity(item._id)}
                          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                        >
                          <Plus />
                        </button>
                      </div>
                      <div>
                        <p className="text-lg font-bold">
                          ${" "}
                          {cart.filter((id) => id === item._id).length *
                            item.price}
                        </p>
                      </div>
                    </div>
                  </div>
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
            <div className="flex items-center  -mt-5 md:mt-0 h-full">
              <input
                type="checkbox"
                id="termsAndConditions"
                className="mr-2 md:mr-0 md:mb-0 h-5 w-5 cursor-pointer"
              />
              <label
                htmlFor="termsAndConditions"
                className="text-sm md:mb-1 ml-3"
              >
                Agree to{" "}
                <Link href="/terms" className="text-blue-500">
                  Terms and Conditions
                </Link>
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
