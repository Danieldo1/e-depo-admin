"use client";

import Hero from "@/components/shop/Hero";
import Products from "@/components/shop/Products";
import React, { useEffect, useState } from "react";


const ShopsPage = () => {
  const [products, setProducts] = useState([]);
useEffect(() => {
  newProducts()
},[])
const newProducts = async () => {
  await fetch("/api/shopProducts").then((response) => {
    response.json().then((data) => {
      console.log(data)
      setProducts(data);
    });
  })
}
  return (
    <main className="bg-[#fafafa] p-5 ">
      <Hero />
        <Products products={products} />
    </main>
  );
};

export default ShopsPage;
