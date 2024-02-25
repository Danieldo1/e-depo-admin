"use client";

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

const CartWrapper = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Check for window object to avoid issues during server-side rendering
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  // Initialize cart from localStorage
  useEffect(() => {
    const storedCart = ls?.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [ls]);

  // Update localStorage when cart changes
  useEffect(() => {
    if (cart.length > 0) {
      ls?.setItem("cart", JSON.stringify(cart));
    } else {
      // If the cart is empty, remove the item from localStorage
      ls?.removeItem("cart");
    }
  }, [cart, ls]);

 const addToCart = (productId) => {
   setCart((prevCart) => [...prevCart, productId]);
 };

const removeProduct = (productId) => {
  setCart((prev) => {
    const position = prev.indexOf(productId);
    if (position !== -1) {
      return prev.filter((p, i) => i !== position);
    } else {
      return prev;
    }
  });
};

  const clearCart = () => {
    setCart([]);
    // Also clear the cart from localStorage
    ls?.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeProduct, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartWrapper;
