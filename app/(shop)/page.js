"use client";

import Hero from "@/components/shop/Hero";
import Products from "@/components/shop/Products";
import React, { useEffect, useState } from "react";
import Categories from "@/components/shop/Categories";


const ShopsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
useEffect(() => {
  newProducts()
  categoryProducts()
},[])
const newProducts = async () => {
  await fetch("/api/shopProducts").then((response) => {
    response.json().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  })
}

const categoryProducts = async () => {
  await fetch("/api/shopCategories").then((response) => {
    response.json().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  })
}

  return (
    <main className="bg-[#fafafa] p-5 ">
      <Hero />
        <Products products={products} loading={loading} />
        <Categories categories={categories} loading={loading} />
    </main>
  );
};

export default ShopsPage;
