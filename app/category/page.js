"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Trash2 } from "lucide-react";

const CategoryPage = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    await fetch("/api/category").then((response) => {
      response.json().then((data) => {
        console.log(data);
        setCategories(data);
      });
    });
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    await fetch("/api/category", {
      method: "POST",
      body: JSON.stringify({ name, parent }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
      });
    });
    setName("");
    fetchCategories();
  };
  return (
    <Layout>
      <h1 className="heading">Category Page</h1>
      <label htmlFor="">Create Category</label>
      <form onSubmit={saveCategory} className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Create Category"
          className="mb-0"
        />
        <select
          className="mb-0 "
          value={parent}
          onChange={(e) => setParent(e.target.value)}
        >
          <option value="" className="border-b border-gray-300">
            Main Category
          </option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button className="btn-save py-1" type="submit">
          Add
        </button>
      </form>
      <div className="">
        <h3 className="heading mt-10">Current Categories</h3>
        {categories.length > 0 &&
          categories.map((category) => (
            <Link
              href={`/category/edit/${category._id}`}
              key={category._id}
              className=""
            >
              <div className="flex my-2 gap-4 p-2 bg-blue-50 hover:bg-blue-100 justify-between items-center rounded-md">
                <div>
                  <h1 className="text-xl font-bold">{category.name}</h1>
                  <p className="text-sm px-1 bg-blue-500 text-white rounded-full font-bold text-center">{category?.parent?.name}</p>
                </div>
                <div className="flex gap-5 items-center">
                  <Link
                    href={`/products/delete/${category._id}`}
                    className="bg-red-500 text-white p-2 rounded-lg items-center flex gap-2 hover:bg-red-600"
                  >
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

export default CategoryPage;
