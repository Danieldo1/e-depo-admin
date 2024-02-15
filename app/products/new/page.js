"use client";

import Layout from "@/components/Layout";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";

const NewProducts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const createNewProduct = async (e, ) => {
    e.preventDefault();
    const data = {title, description, price}
    
   const response = await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
   })

  }

  return (
    <Layout>
      <h1 className="heading">New Products</h1>
      <form onSubmit={(e) => {createNewProduct(e)}}>
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
      <button className="btn-save" type="submit">
        <Plus />
        Add Product
      </button>
      </form>
    </Layout>
  );
};

export default NewProducts;
