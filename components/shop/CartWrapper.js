'use client'

import { createContext, useEffect, useState } from "react";
export const CartContext = createContext({});


const CartWrapper = ({children}) => {
  const ls = typeof window !== 'undefined' ? window.localStorage : null
  const defaultValue = ls ? JSON.parse(ls.getItem('cart')) : []
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if(cart?.length > 0){
      ls?.setItem('cart', JSON.stringify(cart))
    }
  },[cart])

  useEffect(() => {
    if(ls && ls.getItem('cart')){
      setCart(JSON.parse(ls.getItem('cart')))
    }
  },[])

   const useCart = (productId) => {
    setCart([...cart, productId])
  }

  const removeProduct = (productId) => {
    setCart(prev => {
      const position = prev.indexOf(productId);
      if(position !== -1){
      return  prev.filter((p, i) => i !== position)
      } else {
        return prev
      }
    })
  }
  return (
    <CartContext.Provider value={{cart, setCart, useCart, removeProduct}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartWrapper