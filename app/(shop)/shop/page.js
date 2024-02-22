"use client";

import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { CartContext } from "@/components/shop/CartWrapper";

const ShopPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [filter, setFilter] = useState("");
  const { cart, setCart, useCart } = useContext(CartContext);

  useEffect(() => {
    newProducts();
  }, []);

    useEffect(() => {
      sortProducts();
    }, [sortOption, products]);

  const newProducts = async () => {
    await fetch("/api/shopProducts").then((response) => {
      response.json().then((data) => {
        setProducts(data);
        setLoading(false);
      });
    });
  };

  const sortProducts = () => {
    const sortedProducts = [...products].sort((a, b) => {
      let comparison = 0;
      switch (sortOption) {
        case "default":
          comparison =  products
          break;
        case "price_asc":
          comparison = a.price - b.price;
          break;
        case "price_desc":
          comparison = b.price - a.price;
          break;
        case "title_asc":
          comparison = a.title.localeCompare(b.title);
          break;
        case "title_desc":
          comparison = b.title.localeCompare(a.title);
          break;
      }
      return comparison;
    });
    setProducts(sortedProducts);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  function handleSort(value) {
    setSortOption(value);
  }

  function handleFilter(event) {
    setFilter(event.target.value);
  }

  function truncateDescription(description) {
    const words = description.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return description;
  }
  return (
    <main className="bg-[#fafafa] p-5 ">
      <h2 className="text-4xl font-bold text-gray-800">All Products</h2>
      <div className="flex justify-between items-center gap-10">
        <div className="w-[75%]">
          <input
            type="text"
            placeholder="Search products"
            value={filter}
            onChange={handleFilter}
            className="mb-3 p-2 border rounded"
          />
        </div>
        <div className="w-[25%]">
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="mb-3 p-2 border rounded"
          >
            <option value="default">New</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="title_asc">Title: A to Z</option>
            <option value="title_desc">Title: Z to A</option>
          </select>
        </div>
        
      </div>

      <div className="mt-3">
        {/* Loading skeleton */}
        {loading === true && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4  ">
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className="min-w-full cursor-pointer shrink-0 relative"
              >
                <div className="border p-4 rounded-md bg-gray-100 flex flex-col h-[350px] animate-pulse">
                  <div className="h-6 bg-gray-300 rounded-full w-1/4 absolute -top-3 -right-2"></div>
                  <div className="h-6 bg-gray-300 rounded mt-2 mb-4"></div>
                  <div className="h-48 bg-gray-300 rounded-md my-2"></div>
                  <div className="flex-grow bg-gray-300 rounded"></div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                    <div className="w-24 h-8 bg-gray-300 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <div
            key={product._id}
              className="w-full h-full cursor-pointer  shrink-0 relative hover:scale-105 transition-all delay-100 duration-300 ease-in"
            >
            {JSON.stringify(product.properties)}
              <Link
                href={`/product/${product._id}`}
                className="border p-4 rounded-md bg-gray-100 flex flex-col h-[370px] "
              >
                <h3 className="text-lg font-bold">
                  {truncateDescription(product.title || "")}
                </h3>
                <p className="text-gray-600 text-sm flex items-center">
                  {product.properties &&
                    Object.keys(product.properties).map((key, index) => (
                      <span key={index} className="text-gray-600 text-sm">
                        <span className="font-bold capitalize">{key}</span>{" "}
                        <span className="mx-1 capitalize">
                          {product.properties[key]}
                        </span>
                      </span>
                    ))}
                </p>
                <div className="flex justify-center items-center">
                  <img
                    src={product.images[0] || "/noimage.svg"}
                    alt={product.title}
                    className="w-full max-w-48 max-h-48 object-cover rounded-md my-2"
                  />
                </div>
                <p className="text-gray-600 flex-grow overflow-hidden line-clamp-1">
                  {truncateDescription(product.description) || ""}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-800 mt-2 text-end">
                    ${product.price || "0.00"}
                  </p>
                  <button
                    type="button"
                    onClick={() => useCart(product._id)}
                    className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg items-center flex gap-2 hover:bg-blue-600"
                  >
                    Add to cart
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;
