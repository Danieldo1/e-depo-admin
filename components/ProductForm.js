"use client";

import React, { useState } from "react";
import { Plus, PencilLine, UploadCloud,Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  _id,
  title: currentTitle,
  description: currentDescription,
  price: currentPrice,
  images: currentPhotos,
}) => {
  const [title, setTitle] = useState(currentTitle || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [price, setPrice] = useState(currentPrice || "");
  const [images, setImages] = useState(currentPhotos || []);
  const [redirect, setRedirect] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const createNewProduct = async (e) => {
    e.preventDefault();
    const data = { title, description, price, images };
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
      setImages((prev) => {
        return [...prev, ...link];
      });
      setUploading(false);
    };
  }
  return (
    <form
      onSubmit={(e) => {
        createNewProduct(e);
      }}
    >
      <label>Product Photos</label>
      <div className="my-3 flex flex-wrap gap-2">
        <ReactSortable list={images} setList={setImages}  className="flex flex-wrap gap-2">
        {!!images.length  ?(
          images.map((link) => (
            <div key={link} className="relative h-28 w-28 rounded-md overflow-hidden ">
              <img  src={link} alt="Save the product for image to appear" className="object-cover w-full h-full" />
            </div>
          ))
        ):(
          <div
          className="btn-upload rounded-md">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        </div>
         
        )
        }
        </ReactSortable>

        {/* {!productImages?.length && <p className="">Add product images</p>} */}
        <label className="btn-upload hover:cursor-pointer">
          <UploadCloud className="w-12 h-12 text-blue-500" />
          <input type="file" className="hidden" onChange={uploadPhotos} />
        </label>
      </div>

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