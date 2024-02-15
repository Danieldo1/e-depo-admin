"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const EditProduct = () => {
   const [product, setProduct] = useState([]);
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  
  useEffect(() => {
    fetchOneProduct();
  }, []);
  
  const fetchOneProduct = async () => {
    await fetch(`/api/products/byID?id=${id}`).then((response) => {
      response.json().then((data) => {
       console.log(data)
        setProduct(data);
      });
    });
  };


  return (
    <Layout>
      <h1>Edit Product</h1>
      {JSON.stringify(product)}
    </Layout>
  );
};

export default EditProduct;
