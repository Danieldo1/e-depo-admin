"use client";

import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartContext } from "@/components/shop/CartWrapper";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";

const CategoryPageOne = () => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [catName, setCatName] = useState("");
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const { cart, setCart, addToCart } = useContext(CartContext);
  const [likedProducts, setLikedProducts] = useState(null || {});
  const [wishList, setWishList] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    categoryProducts();
    categoryName();
  }, []);

  useEffect(() => {
    fetchLikedProducts();
  }, [session?.user?.email, likedProducts]);

  const fetchLikedProducts = async () => {
    try {
      await fetch(`/api/wishlist?email=${session?.user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0] && Array.isArray(data[0].whishList)) {
            setWishList(data[0].whishList);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const categoryProducts = async () => {
    await fetch(`/api/categoriesProducts?id=${id}`).then((response) => {
      response.json().then((data) => {
        setCategory(data);
        setLoading(false);
      });
    });
  };
  const handleLikeClick = (e, productId) => {
    e.preventDefault();
    if (session) {
      handleLike(productId);
    } else {
      router.push("/login");
    }
  };
  const handleLike = async (productId) => {
    const isLiked = likedProducts ? likedProducts[productId] : false;
    const method = isLiked ? "DELETE" : "POST";

    try {
      const response = await fetch("/api/wishlist", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email, productId }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      setLikedProducts((prevLiked) => ({
        ...prevLiked,
        [productId]: !isLiked,
      }));

      // Update wishList state if the product is unliked
      if (isLiked) {
        setWishList((prevWishList) =>
          prevWishList.filter((id) => id !== productId)
        );
      } else {
        // If the product is liked, add it to the wishList state
        setWishList((prevWishList) => [...prevWishList, productId]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const categoryName = async () => {
    await fetch(`/api/shopCategories/byID?id=${id}`).then((response) => {
      response.json().then((data) => {
        setCatName(data);
        setLoading(false);
      });
    });
  };

  function truncateDescription(description) {
    const words = description.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return description;
  }

  return (
    <main className="bg-[#fafafa] p-5">
      {loading ? (
        <div className=" animate-pulse">
          <div className="h-12 w-3/4 bg-gray-300 rounded mt-2 mb-4"></div>
        </div>
      ) : (
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
          Products in{" "}
          <span className="capitalize">&quot;{catName.name}&quot;</span>{" "}
        </h2>
      )}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="min-w-full cursor-pointer shrink-0 relative"
            >
              <div className="border p-4 rounded-md bg-gray-100 flex flex-col h-[350px] animate-pulse">
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4 mt-5">
          {category.map((product) => (
            <div
              key={product._id}
              className="w-full h-full cursor-pointer  shrink-0 relative hover:scale-105 transition-all delay-100 duration-300 ease-in"
            >
              <Link
                href={`/product/${product._id}`}
                className="border p-4 rounded-md bg-gray-100 flex relative flex-col h-[370px] "
              >
                <button
                  onClick={(e) => handleLikeClick(e, product._id)}
                  className="h-6 absolute top-0 right-0 z-30"
                >
                  <Heart
                    className={
                      wishList.includes(product._id)
                        ? "text-red-500"
                        : "text-gray-900"
                    }
                    fill={wishList.includes(product._id) ? "red" : "none"}
                  />
                </button>
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
                    className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg items-center flex gap-2 hover:bg-blue-600"
                  >
                    <Link href={`/product/${product._id}`}>View</Link>
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default CategoryPageOne;
