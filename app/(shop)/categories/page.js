"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const CategoriesPage = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    allCategories();
  }, []);

  const allCategories = async () => {
    await fetch("/api/shopCategories", { cache: "no-store" }).then(
      (response) => {
        response.json().then((data) => {
          setCategories(data);
          setLoading(false);
        });
      }
    );
  };

  return (
    <main className="bg-[#fafafa] p-5">
      <h2 className="text-4xl font-bold text-gray-800">All Categories</h2>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="min-w-full cursor-pointer shrink-0 relative"
            >
              <div className="relative flex items-center justify-center w-full aspect-square">
                <div className="absolute inset-0 z-30 bg-black opacity-30 rounded-md transition-all delay-100 duration-300 ease-in"></div>
                <div className="text-3xl flex items-center z-40 justify-center font-bold text-center text-white capitalize absolute inset-0">
                  <div className="h-12  bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="p-4 flex flex-col items-center justify-center group"
            >
              <div className="relative flex items-center justify-center w-full aspect-square">
                <div className="absolute inset-0 z-20 rounded-md">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute inset-0 z-30 bg-white opacity-40 rounded-md group-hover:opacity-60 transition-all delay-100 duration-300 ease-in"></div>
                  <h3 className="text-2xl md:text-3xl flex items-start z-40 justify-center font-extrabold text-center text-black  capitalize absolute inset-0">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default CategoriesPage;
