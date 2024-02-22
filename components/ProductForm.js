"use client";

import React, { useState, useEffect } from "react";
import { Plus, PencilLine, UploadCloud, Loader2, Trash2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  _id,
  title: currentTitle,
  description: currentDescription,
  price: currentPrice,
  images: currentPhotos,
  category: currentCategory,
  properties: currentProperties,
  features: currentFeatures,
  color: currentColor,
  weight: currentWeight,
}) => {
  const [title, setTitle] = useState(currentTitle || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [price, setPrice] = useState(currentPrice || "");
  const [images, setImages] = useState(currentPhotos || []);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(currentCategory || "");
  const [prodProperties, setProdProperties] = useState(currentProperties || {});
  const [redirect, setRedirect] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [features, setFeatures] = useState(currentFeatures || []);
  const [color, setColor] = useState(currentColor || "");
  const [weight, setWeight] = useState(currentWeight || "");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    await fetch("/api/category").then((response) => {
      response.json().then((data) => {
        setCategories(data);
      });
    });
  };

  const createNewProduct = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: prodProperties,
      features,
      color,
      weight
    };
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
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const changeProductProperty = (propName, value) => {
    setProdProperties((prev) => {
      return { ...prev, [propName]: value };
    });
  };

  const propertiesTaAdd = [];

  if (categories.length > 0 && category) {
    let selectedCategory = categories.find(({ _id }) => _id === category);
    propertiesTaAdd.push(...selectedCategory?.properties);
    while (selectedCategory?.parent?._id) {
      const parent = categories.find(
        ({ _id }) => _id === selectedCategory?.parent?._id
      );
      propertiesTaAdd.push(...parent.properties);
      selectedCategory = parent;
    }
  }

  return (
    <form
      onSubmit={(e) => {
        createNewProduct(e);
      }}
      className="max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto bg-slate-100 shadow-md shadow-slate-400 p-10 rounded-md"
    >
      <label>Product Photos</label>
      <div className="my-3 flex flex-wrap gap-2">
        <ReactSortable
          list={images}
          setList={setImages}
          className="flex flex-wrap gap-2"
        >
          {images.length < 0 ? (
            <div className="btn-upload rounded-md">
              <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            </div>
          ) : (
            images.map((link, index) => (
              <div
                key={link}
                className="relative group w-28 h-28 cursor-move rounded-md border"
              >
                <img
                  src={link}
                  alt="Product Image"
                  className="object-cover w-full h-full rounded-md"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="hidden group-hover:block absolute top-0 left-0 p-2 bg-red-500 text-white rounded-full"
                >
                  <Trash2 />
                </button>
              </div>
            ))
          )}
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
      <label>Product Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className=""
      >
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories
            .filter((category) => !category.parent)
            .map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
      </select>
      <div className="my-2 flex flex-col w-full">
        {propertiesTaAdd.length > 0 &&
          propertiesTaAdd.map((property) => (
            <div
              key={property.name}
              className="mb-2 flex gap-2  items-center justify-end"
            >
              <div htmlFor="" className="w-[70%] uppercase">
                {property.name}:
              </div>
              <div className="w-full flex justify-end">
                <select
                  className="mb-0"
                  value={prodProperties[property.name]}
                  onChange={(e) => {
                    changeProductProperty(property.name, e.target.value);
                  }}
                >
                  {property?.value?.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
      </div>
      <label htmlFor="">Product Description</label>
      <textarea
        type="text"
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Product Features</label>
      <textarea
        type="text"
        placeholder="Product Features"
        value={features}
        onChange={(e) => setFeatures(e.target.value)}
      />
      <label>Product Color</label>
      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
        <option value="orange">Orange</option>
        <option value="purple">Purple</option>
        <option value="black">Black</option>
        <option value="white">White</option>
        <option value="brown">Brown</option>
        <option value="gray">Gray</option>
        <option value="pink">Pink</option>
        <option value="cyan">Cyan</option>
        <option value="magenta">Magenta</option>
        <option value="lime">Lime</option>
        <option value="maroon">Maroon</option>
        <option value="navy">Navy</option>
        <option value="silver">Silver</option>
        <option value="violet">Violet</option>
        <option value="fuchsia">Fuchsia</option>
        <option value="olive">Olive</option>
        <option value="teal">Teal</option>
        <option value="aqua">Aqua</option>
      </select>
      <div className="flex justify-between mb-3 mt-3">
        <label>Product weight</label>
        <label htmlFor="">Product Price</label>
      </div>
      <div className="flex gap-10 mb-6">
        <input
          type="number"
          placeholder="Product weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
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
