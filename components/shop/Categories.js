import React from "react";
import Link from "next/link";

const Categories = ({ categories, loading }) => {
  return (
    <div className="">
      <h2 className="text-5xl font-bold text-gray-800">Categories</h2>
      {loading === true && (
        <div className="flex overflow-x-auto gap-4 mt-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="min-w-[300px] flex flex-col shrink-0 justify-center items-center">
              <div className="rounded-full w-40 h-40 overflow-hidden bg-gray-300 animate-pulse">
                <div className="w-full h-full rounded-full" />
              </div>
              <div className="h-6 bg-gray-300 rounded-md mt-2 w-3/4 animate-pulse"></div>
            </div>
          ))}
        </div>
      )}
      <div className="flex overflow-x-auto scrollbar-hide p-7 gap-4 mt-4 ">
        {categories.length > 0 &&
          categories.map((category) => (
            <Link
              href={`/categories/${category._id}`}
              key={category._id}
              className="min-w-[300px] flex flex-col shrink-0 justify-center items-center group"
            >
              <div className="rounded-full w-40 h-40 overflow-hidden group-hover:scale-105 transition-all delay-100 duration-300 ease-in">
                <img
                  src={category.image || null}
                  alt={category.name}
                  className="w-full h-full rounded-full object-cover "
                />
              </div>
              <p className="text-lg group-hover:scale-105 transition-all delay-100 duration-300 ease-in font-bold text-gray-800 mt-2 capitalize">
                {category.name}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Categories;
