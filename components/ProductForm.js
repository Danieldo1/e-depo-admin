"use client";

import Layout from "@/components/Layout";
import React, { useState } from "react";
import { Plus, PencilLine } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const ProductForm = ({
  _id,
  title: currentTitle,
  description: currentDescription,
  price: currentPrice,
}) => {
  const [title, setTitle] = useState(currentTitle || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [price, setPrice] = useState(currentPrice || "");
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const createNewProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price };
    if (_id) {
      await fetch(`/api/products`, {
        method: "PUT",
        body: JSON.stringify({ ...data, _id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    setRedirect(true);
  };

  if (redirect) {
    router.push("/products");
  }
  return (
    <form
      onSubmit={(e) => {
        createNewProduct(e);
      }}
    >
      <label htmlFor="">Product Name</label>
      <input
        type="text"
        placeholder="Product Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="">Product Description</label>
      <textarea
        type="text"
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="">Product Price</label>
      <input
        type="number"
        placeholder="Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <div className="flex justify-between">
        <button className="btn-back" onClick={() => router.back()}>
          Back
        </button>
        {pathname.includes("/edit") ? (
          <button className="btn-edit" type="submit">
            <PencilLine />
            Save Changes
          </button>
        ) : (
          <button className="btn-save" type="submit">
            <Plus />
            Add Product
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
