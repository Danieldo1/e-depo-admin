import React from "react";

const BlogCards = () => {
  const blogPosts = [
    {
      title: "The Best Toys for Your Furry Friends",
      description:
        "Discover engaging toys that will keep your pets entertained for hours!",
        img: '/toy.webp',
    },
    {
      title: "Nutrition Tips for a Healthy Pet",
      description:
        "Learn what foods will help your pets stay vibrant and healthy.",
        img:'/vet.webp' ,
    },
  ];

  return (
    <div className="bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          PetPlus Blog Highlights
        </h2>
        <div className="flex flex-wrap -mx-4 justify-center">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="md:w-1/2 px-4 mb-8 cursor-pointer hover:scale-105 transition-all delay-100 duration-300 ease-in"
            >
              <div className="bg-gray-100 p-6 rounded-lg h-full flex flex-col">
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover rounded-t-lg "
                    src={post.img}
                    alt={post.title}
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-gray-600">{post.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCards;
