"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { withSwal } from "react-sweetalert2";

function CategoryPage({ swal }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");
  const [editing, setEditing] = useState(null);

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
    if (editing) {
      await fetch(`/api/category`, {
        method: "PUT",
        body: JSON.stringify({ _id: editing._id, name, parent }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        response.json().then((data) => {
          console.log(data);
          setEditing(null);
          fetchCategories();
          setName("");
          setParent("");
        });
      });
    } else {
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
    }
    setName("");
    fetchCategories();
  };

  const editCategory = async (category) => {
    setEditing(category);
    setName(category.name);
    setParent(category.parent?._id || category);
  };

  const deleteCategory = async (category) => {
    await fetch(`/api/category`, {
      method: "DELETE",
      body: JSON.stringify({ _id: category._id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setEditing(null);
        setName("");
        setParent("");
        fetchCategories();
      });
    });
  }

  return (
    <Layout>
      <h1 className="heading">Category Page</h1>
      <label htmlFor="" className="flex flex-row mb-2">
        {editing ? "Edit" : "Create"} Category{" "}
        {editing ? (
          <p className="font-bold text-base ml-3">{editing.name}</p>
        ) : (
          ""
        )}
      </label>
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
            categories
              .filter((category) => !category.parent)
              .map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
        </select>
        <button className="btn-save py-1" type="submit">
          {editing ? "Update" : "Save"}
        </button>
      </form>
      <div className="">
        <h3 className="heading mt-10">Current Categories</h3>
        {categories.length > 0 &&
          categories.map((category) => (
            <div
              onClick={() => editCategory(category)}
              key={category._id}
              className="cursor-pointer"
            >
              <div className="flex my-2 gap-4 p-2 bg-blue-50 hover:bg-blue-100 justify-between items-center rounded-md">
                <div>
                  <h1 className="text-xl font-bold">{category.name}</h1>
                  <p className="text-sm px-1 bg-blue-500 text-white rounded-full font-bold text-center">
                    {category?.parent?.name}
                  </p>
                </div>
                <div className="flex gap-5 items-center">
                  <div
                    onClick={() => {
                      swal
                        .fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        })
                        .then((result) => {
                          if (result.isConfirmed) {
                            deleteCategory(category);
                          }
                        });
                    }}
                    className="bg-red-500 text-white p-2 rounded-lg items-center flex gap-2 hover:bg-red-600"
                  >
                    <Trash2 />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => (
<CategoryPage swal={swal} />

));
