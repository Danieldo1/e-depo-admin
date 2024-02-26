"use client";

import React, { useEffect, useState, useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Heart } from "lucide-react";
import Link from "next/link";
import { CartContext } from "@/components/shop/CartWrapper";
const AccountPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [showWishList, setShowWishList] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const { cart, setCart, addToCart } = useContext(CartContext);
  const [likedProducts, setLikedProducts] = useState(null || {});
  const [wishList, setWishList] = useState([]);
  const [orders, setOrders] = useState([]);

  const email = session?.user?.email;
  useEffect(() => {
    if (email) {
      fetchUser(email);
    }
  }, [session]);

  useEffect(() => {
    if (userInfo) {
      fetchProducts();
    }
  }, [userInfo]);
  useEffect(() => {
    if (userInfo) {
      fetchLikedProducts();
    }
  }, [userInfo]);
  useEffect(() => {
    if (userInfo) {
      fetchOrders();
    }
  }, [userInfo]);

  const fetchOrders = async () => {
    try {
      await fetch(`/api/orders/byEmail?email=${session?.user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLikedProducts = async () => {
    try {
      await fetch(`/api/wishlist?email=${session?.user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0] && Array.isArray(data[0].whishList)) {
            setWishList(data[0].whishList);
            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async (email) => {
try {
  if (email) {
     fetch(`api/register?id=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUserInfo(data[0]);
          setLoading(false);
        }
      });
  }
} catch (error) {
  console.log(error);
}
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

  const fetchProducts = async () => {
    if (userInfo && userInfo?.whishList.length > 0) {
      await fetch(`/api/products/byIDS?ids=${userInfo.whishList}`).then((res) =>
        res.json().then((data) => {
          if (data) {
            setProducts(data);
            setLoading(false);
          }
        })
      );
    } else {
      setProducts([]);
      setLoading(false);
    }
  };

  function truncateDescription(description) {
    const words = description.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return description;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (session) {
    return (
      <div className="bg-[#fafafa] p-5 h-[calc(100vh-300px)] flex flex-col">
        <div className="flex justify-between items-start md:items-center flex-1">
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Welcome, {userInfo && userInfo.email.split("@")[0]}
            </h2>
            {JSON.stringify(session?.user)}
            {JSON.stringify(userInfo)}
            {/* <p>This is you personal account page </p> */}
            <p className="text-lg mt-2 ">
              Your email is: {userInfo && userInfo.email}
            </p>
            <p className="text-base mt-2">
              Here you can find all your orders and wishlists{" "}
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded "
          >
            Log out
          </button>
        </div>
        <div className="mt-4 flex justify-evenly  items-center">
          <button
            className="p-2 border border-blue-500 rounded-md "
            onClick={() => {
              setShowWishList(true);
              setShowOrders(false);
            }}
            style={{
              borderWidth: "2px",
              borderColor: showWishList ? "#3b82f6" : "#6b7280",
            }}
          >
            <p
              className={`text-lg font-semibold  ${
                showWishList === true ? "text-blue-500 " : "text-gray-500"
              }`}
            >
              Wishlist
            </p>
          </button>

          <button
            className="p-2 border border-blue-500 rounded-md "
            onClick={() => {
              setShowWishList(false);
              setShowOrders(true);
            }}
            style={{
              borderWidth: "2px",
              borderColor: showOrders ? "#3b82f6" : "#6b7280",
            }}
          >
            <p
              className={`text-lg font-semibold  ${
                showOrders === true ? "text-blue-500 " : "text-gray-500"
              }`}
            >
              Orders
            </p>
          </button>
        </div>
        {showWishList && products.length > 0 && (
          <div className="mt-8">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
              Wishlist
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="w-full h-full cursor-pointer "
                >
                  <Link
                    href={`/product/${product._id}`}
                    className="border p-4 rounded-md bg-gray-100 flex flex-col relative h-[370px] "
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
          </div>
        )}
        {products.length === 0 && showWishList && (
          <div>
            <h2 className="text-4xl font-bold text-gray-800 text-center mt-8 mb-4">
              You have no wishlist
            </h2>
            <p>Add products to your wishlist by going to the shop</p>
          </div>
        )}
        {orders.length > 0 && showOrders && (
          <>
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
              Past Orders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border p-4 rounded-md bg-white flex flex-col"
                >
                  <div className="font-bold mb-4">Order ID: {order._id}</div>
                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="font-bold">Customer Information:</div>
                      <div>
                        Name: {order.firstName} {order.lastName}
                      </div>
                      <div>Email: {order.email}</div>
                      <div>Phone: {order.phone}</div>
                      <div>City: {order.city}</div>
                      <div>Zip: {order.zip}</div>
                      <div>Address: {order.address}</div>
                      <div>Country: {order.country}</div>
                    </div>
                    <div>
                      <div className="font-bold">Order Information:</div>
                      <div>Created At: {order.createdAt.slice(0, 10)}</div>
                      <div>Paid: {order.paid ? "Yes" : "No"}</div>
                      <div>Fulfilled: {order.fulfilled ? "Yes" : "No"}</div>
                    </div>
                  </div>
                  <div className="font-bold mb-2">Products:</div>
                  {order.line_items.map((item) => (
                    <div
                      key={item.price_data.product_data.name}
                      className="flex justify-between border-b-2  mb-2"
                    >
                      <div>{item.price_data.product_data.name}</div>
                      <div className="flex ml-5 justify-center items-center gap-5">
                        <div className="">
                          <p>x{item.quantity}</p>
                        </div>
                        <div className="">
                          <p>${item.price_data.unit_amount / 100}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
        {orders.length === 0 && showOrders && (
          <div>
            <h2 className="text-4xl font-bold text-gray-800 text-center mt-8 mb-4">
              You have no orders
            </h2>
            <p>Start shopping to place an order</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] p-5 h-screen">
      <h2 className="text-4xl font-bold text-gray-800">
        You are not logged in
      </h2>
      <p className="text-gray-600">Please log in to access your account.</p>
      <div className="mt-4 flex justify-center gap-4 items-center">
        <button
          onClick={() => router.push("/signup")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Sign up
        </button>
        <p className="text-gray-600 mt-4">or</p>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
