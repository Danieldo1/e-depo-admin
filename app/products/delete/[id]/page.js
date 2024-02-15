"use client";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DeleteProductPage = () => {
  const pathname = usePathname();
  const [product, setProduct] = useState(null);
  const id = pathname.split("/").pop();
  useEffect(() => {
    fetchOneProduct();
  }, []);
  const fetchOneProduct = async () => {
    await fetch(`/api/products/byID?id=${id}`).then((response) => {
      response.json().then((data) => {
        setProduct(data);
      });
    });
  };

  const deleteProduct = async () => {
    await fetch(`/api/products/byID?id=${id}`, {
      method: "DELETE",
    });
    window.history.back();
  }

  return (
    <Layout>
      {product && (
        <>
          <h1 className="heading">Deleting {product?.title}</h1>
          <div className="border p-10 rounded-md bg-gray-50">
            <h3 className="text-lg font-bold text-center">
              Are you sure you want to delete {product?.title}?
            </h3>
            <div className="flex gap-5 mt-5 justify-center">
              <button onClick={() => deleteProduct()} className="bg-red-500 text-white p-2 rounded-lg items-center flex gap-2 hover:bg-red-600">
                Delete
              </button>
              <button
                onClick={() => window.history.back()}
                className="bg-blue-500 text-white p-2 rounded-lg items-center flex gap-2 hover:bg-blue-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default DeleteProductPage;
