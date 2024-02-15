"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  useEffect(() => {
    fetchOneProduct();
  }, []);

  const fetchOneProduct = async () => {
    await fetch(`/api/products/byID?id=${id}`).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setProduct(data);
      });
    });
  };

  return (
    <Layout>
      {product && (
        <>
          <h1 className="heading">Edit Product {product.title}</h1>
          <ProductForm {...product} />
        </>
      )}
    </Layout>
  );
};

export default EditProduct;
