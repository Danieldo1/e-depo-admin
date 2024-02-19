import React from "react";

const Categories = ({ categories, loading }) => {
  return (
    <div className="">
      <h2 className="text-5xl font-bold text-gray-800">Categories</h2>
      {loading === true && <h2>Loading</h2>}
      <div className="flex overflow-x-auto scrollbar-hide p-7 gap-4 mt-4 ">
        {categories.length > 0 &&
          categories.map((category) => (
            <div key={category._id} className="min-w-[300px]">
                <div>
                  <img src={category.image || null} alt={category.name} />
                </div>
              <p className="text-lg font-semibold text-gray-800 mt-2">
                {category.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
