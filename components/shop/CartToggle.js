"use client";

import React, { useContext, useEffect, useState } from "react";
import { ArrowRightCircle } from "lucide-react";
import { CartContext } from "@/components/shop/CartWrapper";
import Link from "next/link";

import { XIcon } from "lucide-react";
import AllItems from "./AllItems";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CartToggle = ({ showCart, setShowCart }) => {
  
  const { cart, setCart, addToCart, removeProduct } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
    useEffect(() => {
      // This effect should run only when showCart is true
      if (showCart && cart.length > 0) {
        const fetchProducts = async () => {
          try {
            setLoading(true);
            const response = await fetch(`/api/cart?ids=${cart.join(",")}`);
            if (response.ok) {
              const data = await response.json();
              setCartItems(data);
            } else {
              console.error("Failed to fetch products");
            }
          } catch (error) {
            console.error("Error fetching products:", error);
          } finally {
            setLoading(false);
          }
        };

        fetchProducts();
      }
    }, [showCart, cart]); // Add showCart as a dependency

    if (!showCart) return null;
  const handleCheckoutClick = () => {
    setShowCart(false);
    if (session !== null) {
      router.push("/checkout");
    } else if (
      !session ||
      !session.user ||
      !session.user.email ||
      session === null
    ) {
      router.push("/account");
    }
  };

  const addQuantity = (id) => {
    addToCart(id);
  };

  const removeQuantity = (id) => {
    removeProduct(id);
  };

  const shipping = 15;
  let subtotal = 0;

  for (const item of cart) {
    const price = cartItems.find((i) => i._id === item)?.price || 0;
    subtotal += price;
  }

  return (
    <main
      onClick={(e) => {
        if (e.target.closest("aside")) {
          return;
        }
        setShowCart(false);
      }}
      className={` w-screen h-screen fixed top-0 left-0 ${
        showCart ? "backdrop-blur z-40 " : ""
      }`}
    >
      <aside className="fixed top-0 right-0 w-full h-full flex flex-col justify-between gap-4 max-w-lg p-4 bg-[#f5f5f5] border border-gray-200 rounded-lg shadow sm:p-6 md:p-8  z-50 backdrop-blur ">
        <h3 className="text-xl font-bold text-gray-900 ">Shopping Cart</h3>
        <div className="overflow-scroll h-full flex flex-col">
          {!cart?.length && (
            <div className="flex flex-col justify-center items-center h-full mt-5">
              <p className="text-gray-500">Cart is empty</p>
              <p className="text-gray-500">Please add some items</p>
              <img src="/empty-cart.png" alt="empty-cart" />
              <p className="text-gray-500">to your cart</p>
              <button
                onClick={() => {
                  setShowCart(false);
                  router.push("/shop");
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg mt-5"
              >
                Shop Now
              </button>
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
            <div className="">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setShowCart(false)}
                  className="border border-gray-200 rounded-lg p-4 my-2 bg-white cursor-pointer"
                >
                  <Link href={`/product/${item._id}`}>
                    <AllItems
                      item={item}
                      addQuantity={addQuantity}
                      removeQuantity={removeQuantity}
                      cart={cart}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => setShowCart(false)}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  absolute right-2 top-2"
        >
          <XIcon className="w-5 h-5" />
        </button>

        <div className="p-5 bg-[#f5f5f5] text-black border-t border-gray-200 z-30">
          <div className="flex justify-between items-center ">
            <div className="flex flex-col">
              <p>Total Items: {cart.length}</p>
              <p>Subtotal: ${subtotal}</p>
              <p>Shipping: ${shipping}</p>
              <h2 className="text-xl font-bold">
                Total: ${subtotal + shipping}
              </h2>
            </div>
            {/* <div className="text-lg font-bold">Subtotal: ${subtotal}</div> */}
            {!cart.length > 0 && session !== null ? (
              <button
                type="submit"
                className={
                  "bg-gray-500 text-white font-bold px-4 py-2 rounded-lg items-center flex gap-2 hover:bg-gray-600 cursor-not-allowed"
                }
                disabled
              >
                Payment <ArrowRightCircle />
              </button>
            ) : (
              <button
                onClick={handleCheckoutClick}
                className={
                  "bg-blue-500 text-white font-bold px-4 py-2 rounded-lg items-center flex gap-2 hover:bg-blue-600"
                }
              >
                Checkout <ArrowRightCircle />
              </button>
            )}
          </div>
        </div>
      </aside>
    </main>
  );
};

export default CartToggle;
