"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Trash2, UploadCloud,Loader2 } from "lucide-react";
import { withSwal } from "react-sweetalert2";

function CategoryPage({ swal }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");
  const [editing, setEditing] = useState(null);
  const [properties, setProperties] = useState([]);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

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
        body: JSON.stringify({
          _id: editing._id,
          name,
          parent,
          properties: properties.map((p) => ({
            name: p.name,
            value: p.value.split(","),
          })),
          image: images[0],
        }),
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
          setProperties([]);
          setImages([]);
        });
      });
    } else {
      await fetch("/api/category", {
        method: "POST",
        body: JSON.stringify({
          name,
          parent,
          properties: properties.map((p) => ({
            name: p.name,
            value: p.value.split(","),
          })),
          image: images[0],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        response.json().then((data) => {
          console.log(data);
          fetchCategories();
          setName("");
          setParent("");
          setProperties([]);
          setImages([]);
          setEditing(null);
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
    setProperties(
      category.properties.map((p) => ({
        name: p.name,
        value: p.value.join(","),
      }))
      
    );
    setImages(category.image || []);
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
        setEditing(null);
        setName("");
        setParent("");
        setProperties([]);
        setImages([]);
        fetchCategories();
      });
    });
  };

  const addProperty = async (e) => {
    setProperties((prev) => {
      return [...prev, { name: "", value: "" }];
    });
  };

  const deleteProperty = (index) => {
    setProperties((prev) => {
      return [...prev].filter((p, i) => {
        return i !== index;
      });
    });
  };

  const uploadPhotos = async (e) => {
   const files = e.target.files;
   if (files?.length > 0) {
     setUploading(true);
     const data = new FormData();
     for (const file of files) {
       data.append("file", file);
     }
     const res = await fetch("/api/upload", {
       method: "POST",
       body: data,
     });

     const link = await res.json();
     setUploading(false);
     setImages((prev) => {
       return [...prev, ...link];
     })
   }
}

 const handleDeleteImage = (index) => {
   // Create a copy of the current images array
   const updatedImages = [...images];
   // Remove the image at the specified index
   updatedImages.splice(index, 1);
   // Update the state with the modified array (removing the deleted image)
   setImages(updatedImages);
 };


  return (
    <Layout>
      <h1 className="heading">Category Page</h1>
      <div className="flex flex-row mb-5">
        {uploading === true && (
          <div className="btn-upload rounded-md">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
          </div>
        )}
        {images.length > 0 ? (
          <div className="flex flex-col gap-2 relative group">
            <label>Category Image</label>

            <img
              src={images}
              alt=""
              className="w-48 h-48 object-cover rounded-md"
            />
            <button
              onClick={() => handleDeleteImage(0)}
              className="hidden group-hover:block absolute top-0 left-0 p-2 bg-red-500 text-white rounded-full"
            >
              <Trash2 />
            </button>
          </div>
        ) : (
          <label className="btn-upload hover:cursor-pointer">
            <UploadCloud className="w-12 h-12 text-blue-500" />
            <input type="file" className="hidden" onChange={uploadPhotos} />
          </label>
        )}
      </div>

      <label htmlFor="" className="flex flex-row -mb-5">
        {editing ? "Edit" : "Create"} Category{" "}
        {editing ? (
          <p className="font-bold text-base ml-2">{editing.name}</p>
        ) : (
          ""
        )}
      </label>
      <label className="flex flex-row mb-2 justify-end">Category Type</label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Create Category"
          />
          <select
            value={parent}
            onChange={(e) => setParent(e.target.value)}
            className=""
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
        </div>
        <div className="mb-5 ">
          <label>Sub Property</label>
          <button
            className="btn-edit"
            type="button"
            onClick={(e) => addProperty(e)}
          >
            Add new sub property
          </button>
          {properties.length > 0 && (
            <label className="text-red-500 text-center flex justify-end">
              Please add values with a comma (1 kg,2 kg,3 kg)
            </label>
          )}
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div
                key={index}
                className="flex  items-center justify-center gap-2 mt-2"
              >
                <div className="flex flex-col">
                  <label className="mb-1">Name</label>
                  <input
                    type="text"
                    value={property.name}
                    onChange={(e) =>
                      setProperties((prev) => {
                        prev[index].name = e.target.value;
                        return [...prev];
                      })
                    }
                    placeholder="Property Name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1">Values</label>

                  <input
                    type="text"
                    value={property.value}
                    onChange={(e) =>
                      setProperties((prev) => {
                        prev[index].value = e.target.value;
                        return [...prev];
                      })
                    }
                    placeholder="Property Value"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => deleteProperty(index)}
                  className="p-2 mt-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
        </div>
        <button
          className="btn-save py-1 w-full text-center text-lg font-bold flex justify-center items-center"
          type="submit"
        >
          {editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button
            onClick={() => {
              setEditing(null);
              setName("");
              setParent("");
              setProperties([]);
              setImages([]);
            }}
            className="btn-back py-1 mt-2 w-full text-center text-lg font-bold flex justify-center items-center"
            type="button"
          >
            Cancel
          </button>
        )}
      </form>
      {!editing && (
        <div className="">
          <h3 className="heading mt-10">Current Categories</h3>
          {categories.length > 0 &&
            categories.map((category) => (
              <div
                onClick={() => editCategory(category)}
                key={category._id}
                className="cursor-pointer"
              >
                <div className="flex my-2 gap-4 p-2 bg-gray-50 hover:bg-gray-100 justify-between items-center rounded-md">
                  <div>
                    <h1 className="text-xl font-bold">{category.name}</h1>
                    <p className="text-sm px-1 bg-sky-500 text-white rounded-full font-bold text-center">
                      {category?.parent?.name}
                    </p>
                  </div>
                  <div className="flex gap-5 items-center">
                    <div
                      onClick={() => {
                        swal
                          .fire({
                            title: `Delete ${category.name}?`,
                            text: "You won't be able to revert this!",
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Yes, delete it!",
                          })
                          .then((result) => {
                            if (result.isConfirmed) {
                              deleteCategory(category);
                              swal.fire(
                                "Deleted!",
                                "Your category has been deleted.",
                                "success"
                              );
                            } else {
                              swal.fire(
                                "Cancelled",
                                "Your category is safe :)",
                                "success"
                              );
                              setEditing(null);
                              setName("");
                              setParent("");
                              setProperties([]);
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
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <CategoryPage swal={swal} />);
