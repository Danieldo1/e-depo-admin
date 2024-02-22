"use client";

import { CartContext } from "@/components/shop/CartWrapper";
import { usePathname } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { Loader2, ShoppingBag } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import Lightbox from "react-image-lightbox";
import CartToggle from "@/components/shop/CartToggle";

import "react-image-lightbox/style.css";
import "swiper/css";
import "swiper/css/pagination";

const ProductPage = () => {
  const { cart, setCart, useCart } = useContext(CartContext);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showCart, setShowCart] = useState(false);

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

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setLightboxIsOpen(true);
  };

  if (loading === true) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }
  if (!!showCart) {
    return (
      <CartToggle showCart={showCart} setShowCart={setShowCart} cart={cart} />
    );
  }
  return (
    <div className="min-h-screen bg-[#fafafa] p-5 ">
      <div className="flex uppercase text-sm italic text-gray-600 mb-2">
        <p>{category?.name}</p>
        {typeof item.properties === "object" &&
          Object.entries(item.properties).map(([key, value], index) =>
            index % 2 === 0 ? (
              <p key={key} className="mx-0.5">
                {" "}
                / {value || ""} /{" "}
              </p>
            ) : (
              <p>{value || ""}</p>
            )
          )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4  ">
        {/* Mobile Imgs */}
        <div className="w-full md:w-[60%] mx-auto lg:hidden rounded-md">
          <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={5}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            {item.images &&
              item.images.map((image, index) => (
                <SwiperSlide key={image} className="aspect-square">
                  <img
                    src={image}
                    alt={item.title}
                    className="w-full h-full object-contain rounded-md"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        {/* Desktop Imgs */}
        <div className="hidden lg:grid md:grid-cols-2 md:grid-rows-2 gap-5 rounded-md">
          {item.images &&
            item.images.map((image, index) => (
              <div className="aspect-square" key={image}>
                <img
                  src={image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md cursor-pointer"
                  onClick={() => handleImageClick(index)}
                />
              </div>
            ))}
          {lightboxIsOpen && (
            <Lightbox
              onImageLoad={() => {
                window.dispatchEvent(new Event("resize"));
              }}
              mainSrc={item.images[selectedImageIndex]}
              nextSrc={
                item.images[(selectedImageIndex + 1) % item.images.length]
              }
              prevSrc={
                item.images[
                  (selectedImageIndex + item.images.length - 1) %
                    item.images.length
                ]
              }
              onCloseRequest={() => setLightboxIsOpen(false)}
              onMovePrevRequest={() =>
                setSelectedImageIndex(
                  (selectedImageIndex + item.images.length - 1) %
                    item.images.length
                )
              }
              onMoveNextRequest={() =>
                setSelectedImageIndex(
                  (selectedImageIndex + 1) % item.images.length
                )
              }
            />
          )}
        </div>

        {/* Details */}
        <div className="w-full h-full lg:max-w-lg xl:max-w-xl mx-auto">
          <div className="flex gap-2 justify-between mb-7">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-gray-800">
                Product {item?.title}
              </h2>
              <div className="flex gap-2">
                {item.properties &&
                  typeof item.properties === "object" &&
                  Object.entries(item.properties).map(([key, value]) => (
                    <div key={key}>
                      <p className="bg-gray-200 p-2 rounded-md capitalize">
                        <span className="font-semibold ">{key}</span>: {value}
                      </p>
                    </div>
                  ))}
              </div>
              <h4 className="text-lg font-bold text-gray-800">Description</h4>
              <p className="text-lg text-gray-800">{item?.description}</p>
              <div>
                {item?.features && item.features[0] && (
                  <>
                    <h4 className="text-lg font-bold text-gray-800">
                      Features
                    </h4>
                    <ul className="list-disc ml-4">
                      {item.features[0].split("\n").map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div className="flex justify-between ">
                {item?.color && (
                  <div className="flex gap-2 flex-col items-center">
                    <h4 className="text-lg font-bold text-gray-800">Color</h4>
                    <p className="text-lg text-gray-800 capitalize">
                      {item.color}
                    </p>
                  </div>
                )}
                {item?.weight && (
                  <div className="flex gap-2 flex-col items-center">
                    <h4 className="text-lg font-bold text-gray-800">Weight</h4>
                    <p className="text-lg text-gray-800 ">{item.weight} lbs</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              useCart(item._id);
              setShowCart(true);
            }}
            className="bg-blue-500 text-white font-semibold text-xl md:text-lg px-4 py-4 rounded-lg items-center flex gap-2 hover:bg-blue-600 w-full  justify-center"
          >
            <ShoppingBag />
            Add to cart ${item?.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
