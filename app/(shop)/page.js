"use client";

import Hero from "@/components/shop/Hero";
import Products from "@/components/shop/Products";
import React, { useEffect, useState } from "react";
import Categories from "@/components/shop/Categories";
import NewsletterSignUp from "@/components/shop/NewsletterSignUp";
import CoreValues from "@/components/shop/CoreValues";
import BlogCards from "@/components/shop/BlogCards";


const ShopsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showNew, setShowNew] = useState(true);
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
      <h1 className="text-4xl font-bold text-gray-800">New Products</h1>
      <Products products={products} loading={loading} showNew={showNew} />
      <CoreValues />
      <Categories categories={categories} loading={loading} />
      <BlogCards />
      <NewsletterSignUp />
    </main>
  );
};

export default ShopsPage;
