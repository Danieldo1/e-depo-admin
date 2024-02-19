'use client'

import { createContext, useState } from "react";
export const CartContext = createContext({});


const CartWrapper = ({children}) => {
  const [cart, setCart] = useState([]);
   const useCart = (productId) => {
    setCart([...cart, productId])
  }
  return (
    <CartContext.Provider value={{cart, setCart, useCart}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartWrapper