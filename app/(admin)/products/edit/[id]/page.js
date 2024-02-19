"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { Loader2 } from "lucide-react";

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  useEffect(() => {
    fetchOneProduct();
  }, []);

  const fetchOneProduct = async () => {
    await fetch(`/api/products/byID?id=${id}`).then((response) => {
      response.json().then((data) => {
        setProduct(data);
        setLoading(false);
      });
    });
  };
   if (loading) {
     return <div className="flex justify-center items-center h-screen"><Loader2 className="w-6 h-6 animate-spin"/></div>; // Render loading state
   }

  return (
    <Layout>
      {product &&  (
        <>
          <h1 className="heading">Edit Product {product.title}</h1>
          <ProductForm {...product} />
        </>
      )}
    </Layout>
  );
};

export default EditProduct;
