"use client";

import { CartContext } from "@/components/shop/CartWrapper";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { Loader2, ShoppingBag } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";

import "swiper/css";

import "swiper/css/pagination";

const ProductPage = () => {
  const { cart, setCart, useCart } = useContext(CartContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);

  const pathname = usePathname();
  const id = pathname.split("/").pop();

  useEffect(() => {
    fetchOneItem();
  }, []);

  useEffect(() => {
    if (item) {
      fetchOneCategory();
    }
  }, [item]);
  const fetchOneItem = async () => {
    await fetch(`/api/products/byID?id=${id}`).then((response) => {
      response.json().then((data) => {
        setItem(data);
      });
    });
  };

  const fetchOneCategory = async () => {
    await fetch(`/api/shopCategories/byID?id=${item.category}`).then(
      (response) => {
        response.json().then((data) => {
          setCategory(data);
          setLoading(false);
        });
      }
    );
  };

  if (loading === true) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-5 ">
      <div className="flex uppercase text-sm italic text-gray-600 mb-2">
        <p>{category?.name}</p>
        {Object.entries(item.properties).map(([key, value], index) =>
          index % 2 === 0 ? (
            <p key={key} className="mx-0.5">
              {" "}
              / {value} /{" "}
            </p>
          ) : (
            <p>{value}</p>
          )
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  ">
        {/* Mobile Imgs */}
        <div className="w-full lg:hidden">
          <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={5}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {item.images &&
              item.images.map((image, index) => (
                <SwiperSlide key={image}>
                  <img
                    src={image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        {/* Desktop Imgs */}
        <div className="hidden lg:grid md:grid-cols-2 md:grid-rows-2">
          {item.images &&
            item.images.map((image, index) => (
              <img
                key={image}
                src={image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ))}
        </div>
        <div className="w-full  lg:max-w-lg xl:max-w-xl mx-auto">
          <div className="flex gap-2 justify-between mb-7">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-gray-800">
                Product {item?.title}
              </h2>
              <div className="flex gap-2">
                {Object.entries(item.properties).map(([key, value]) => (
                  <div key={key}>
                    <p className="bg-gray-200 p-2 rounded-md capitalize">
                      <span className="font-semibold ">{key}</span>: {value}
                    </p>
                  </div>
                ))}
              </div>
              <h4 className="text-lg font-bold text-gray-800">Description</h4>
              <p className="text-lg text-gray-800">{item?.description}</p>
            </div>
            <div className="mt-2">
              <p className="text-xl font-bold text-gray-700">${item?.price}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => useCart(item._id)}
            className="bg-blue-500 text-white font-semibold text-xl md:text-lg px-4 py-4 rounded-lg items-center flex gap-2 hover:bg-blue-600 w-full  justify-center"
          >
            <ShoppingBag />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
