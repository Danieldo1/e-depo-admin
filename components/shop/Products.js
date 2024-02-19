import React, { useContext } from "react";
import Link from "next/link";
import { CartContext } from "@/components/shop/CartWrapper";

const Products = ({ products, loading }) => {
  const { cart, setCart, useCart } = useContext(CartContext);

  return (
    <div className="">
      <h1 className="text-5xl font-bold text-gray-800">New Products</h1>
      <div className="flex overflow-x-auto scrollbar-hide p-7 gap-4 mt-4 ">
        {loading === true && (
          <div className="flex overflow-x-auto gap-4 mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="min-w-[300px] cursor-pointer shrink-0 relative"
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
        {products.map((product) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="min-w-[300px] cursor-pointer  shrink-0 relative hover:scale-105 transition-all delay-100 duration-300 ease-in"
          >
            <div className="border p-4 rounded-md bg-gray-100 flex flex-col h-[350px] ">
              <p className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full absolute -top-3 -right-2">
                NEW
              </p>
              <h3 className="text-lg font-bold">{product.title}</h3>
              <div className="flex justify-center items-center">
                <img
                  src={product.images[0] || "/noimage.svg"}
                  alt={product.title}
                  className="w-full max-w-48 max-h-48 object-cover rounded-md my-2"
                />
              </div>
              <p className="text-gray-600 flex-grow overflow-hidden text-ellipsis capitalize">
                {product.description || ""}
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
