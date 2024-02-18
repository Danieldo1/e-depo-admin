"use client";

import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PackagePlus,Trash2 } from "lucide-react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await fetch("/api/products").then((response) => {
      response.json().then((data) => {
        setProducts(data);
      });
    });
  };
  return (
    <Layout>
      <h1 className="heading ">Products</h1>
      <div className=" ">
        <Link
          href="/products/new"
          className="flex rounded-md bg-blue-500 text-white items-center justify-center gap-2 p-4 hover:bg-blue-600 max-w-3xl mx-auto"
        >
          <PackagePlus className="w-6 h-6 " />
          <h1 className="text-md font-bold ">Add Product</h1>
        </Link>
      </div>
      <div className="mt-4">
      <h1 className="text-md font-bold ">Edit Product</h1>
        {products.map((product) => (
          <Link href={`/products/edit/${product._id}`}  key={product._id}  className="">
            <div className="flex my-2 gap-4 p-2 bg-blue-50 hover:bg-blue-100 justify-between items-center rounded-md">
              <div>
              <h1 className="text-xl font-bold">{product.title}</h1>
              <p className="text-sm line-clamp-1">{product.description}</p>
              </div>
              <div  className="flex gap-5 items-center">
              <h1 className="text-xl font-bold">{product.price}</h1>
              <Link href={`/products/delete/${product._id}`} className="bg-red-500 text-white p-2 rounded-lg items-center flex gap-2 hover:bg-red-600">
              <Trash2 />
              </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default ProductsPage;
