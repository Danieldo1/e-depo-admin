"use client";

import React, { useContext, useEffect, useState } from "react";
import { ArrowRightCircle } from "lucide-react";
import { CartContext } from "@/components/shop/CartWrapper";
import Link from "next/link";
import AllItems from "@/components/shop/AllItems";
import { CountryDropdown } from "react-country-region-selector";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cart, setCart, addToCart, removeProduct, clearCart } =
    useContext(CartContext);
    const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");

  const router = useRouter();

  if (!session) {
    router.push("/account");
  }


  useEffect(() => {
    if (cart.length > 0) {
      fetchProducts();
    } else {
      setCartItems([]);
    }
  }, [cart]);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cart?ids=${cart.join(",")}`);
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
        setLoading(false);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z
      .string()
      .min(6, { message: "Phone number must be at least 10 digits" }),
    city: z.string().min(1, { message: "City is required" }),
    zip: z.string().min(4, { message: "ZIP code must be at least 5 digits" }),
    address: z.string().min(1, { message: "Address is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    termsAndConditions: z
      .boolean()
      .refine((val) => val, "You must agree to the terms and conditions"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      city: city,
      zip: zip,
      address: address,
      country: country,
      termsAndConditions: document.getElementById("termsAndConditions").checked,
    };
    try {
      formSchema.safeParse(formData);
    } catch (err) {
      const errorMessages = err.errors.map((error) =>
        translate(`validation_errors.type.${error.type}`, {
          givenType: typeof _.get(error.path, person),
        })
      );

      console.log(errorMessages, "errorMessages");
    }

    if (!formSchema.safeParse(formData).success) {
      const errorMessages = formSchema
        .safeParse(formData)
        .error.errors.map((error) => error.message);
      alert(errorMessages);
    } else {
      const data = {
        firstName,
        lastName,
        phone,
        email,
        city,
        zip,
        address,
        country,
        products: cart,
        user: session?.user?.email,
      };
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.url) {
        router.push(responseData.url);
      } else {
        console.error("Stripe URL not found in the response.");
      }
    }
  };

  const addQuantity = (id) => {
    addToCart(id);
  };

  const removeQuantity = (id) => {
    removeProduct(id);
  };
  const shipping = 15;
  let subtotal = 0;

  for (const item of cart) {
    const price = cartItems.find((i) => i._id === item)?.price || 0;
    subtotal += price;
  }

  return (
    <main className=" flex flex-col overflow-clip">
      <h1 className="text-4xl font-bold bg-[#f5f5f5] px-5 text1 mt-3">
        Checkout
      </h1>
      <div className="grid sm:grid-cols-[1fr]  md:grid-cols-2 md:gap-10 lg:gap-40   w-full h-full bg-[#f5f5f5] absolute">
        <div className="bg-[#f5f5f5] rounded-bl-lg md:rounded-b-lg h-3/4">
          <div className="p-5 flex flex-col gap-5 h-[calc(100vh-300px)] overflow-x-hidden ">
            <h3 className="text-xl font-bold">Cart Details</h3>
            {loading === false && cartItems.length > 0 && (
              <div className="flex flex-row justify-between uppercase text-gray-500 text-sm border-b pb-4">
                <label>Product</label>
                <label className="ml-40">Quantity</label>
                <label className=" ml-2 md:ml-0 md:mr-5"> Price</label>
              </div>
            )}
            {!cart?.length && (
              <div className="flex flex-col justify-center items-center h-full mt-5">
                <p className="text-gray-500">Cart is empty</p>
                <p className="text-gray-500">Please add some items</p>
                <img src="/empty-cart.png" alt="empty-cart" />
                <p className="text-gray-500">to your cart</p>
                <Link
                  href={"/shop"}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg mt-5"
                >
                  Shop Now
                </Link>
              </div>
            )}
            {loading === true && (
              <div className="p-5 flex flex-col gap-5 h-full overflow-scroll">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 animate-pulse bg-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="animate-pulse bg-gray-400 h-16 w-16 rounded-lg"></div>
                        <div className="skeleton-box bg-gray-400 h-8 w-full rounded"></div>
                      </div>
                      <div>
                        <p className="skeleton-box bg-gray-400 h-8 w-24 rounded"></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {loading === false && cartItems?.length > 0 && (
              <>
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="border border-gray-500 bg-white rounded-lg p-4 scrollbar-hide flex flex-col gap-5"
                  >
                    <AllItems
                      item={item}
                      addQuantity={addQuantity}
                      removeQuantity={removeQuantity}
                      cart={cart}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {/* Form */}
        {cart?.length > 0 && (
          <div className="bg-[#f5f5f5] rounded-br-lg md:rounded-b-lg h-3/4 ">
            <div className="p-5 flex flex-col gap-5 h-full w-full">
              <h3 className="text-xl font-bold">Contact Details</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <label>Shipping Details</label>
                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <input
                      className="w-full p-2 border border-gray-300 rounded-md mb-4 md:mb-0"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      name="firstName"
                    />
                    <input
                      className="w-full p-2 border border-gray-300 rounded-md mb-0"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      name="lastName"
                    />
                  </div>

                  <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                  />
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    name="phone"
                  />

                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <input
                      className="w-full p-2 border border-gray-300 rounded-md mb-4 md:mb-0"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      name="city"
                    />
                    <input
                      className="w-full p-2 border border-gray-300 rounded-md mb-0"
                      placeholder="Zip Code"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      name="zip"
                    />
                  </div>

                  <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    name="address"
                  />
                  <CountryDropdown
                    value={country}
                    onChange={(val) => setCountry(val)}
                    defaultOptionLabel="Choose Country"
                    classes="h-10"
                    name="country"
                  />
                  <input
                    type="hidden"
                    value={cart?.join(",")}
                    name="products"
                  />
                  <div className="flex items-center ">
                    <input
                      type="checkbox"
                      id="termsAndConditions"
                      className="mt-0 md:mr-0 md:mb-0 h-5 w-5 cursor-pointer"
                    />
                    <label
                      htmlFor="termsAndConditions"
                      className="text-sm mb-1 ml-3"
                    >
                      Agree to{" "}
                      <Link
                        href="/terms"
                        target="_blank"
                        className="text-blue-500"
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
        
                </div>
                  <div className="flex items-start justify-between flex-col mt-10 md:hidden">
                    <p>Total Items: {cart.length}</p>
                    <p>Shipping: ${shipping}</p>
                    <p>Subtotal: ${subtotal}</p>
                    <h2 className="text-xl font-bold">
                      Total: ${subtotal + shipping}
                    </h2>
          
                </div>
                {!cart.length > 0 ? (
                  <button
                    className={
                      "bg-gray-500 mb-5 text-white font-bold px-4 py-2 rounded-lg items-center flex gap-2 hover:bg-gray-600 cursor-not-allowed"
                    }
                    disabled
                  >
                    Payment <ArrowRightCircle />
                  </button>
                ) : (
                  <button
                    className={
                      "bg-blue-500 relative mb-5 z-50 mt-10 w-full justify-center text-white font-bold px-4 py-2 rounded-lg items-center flex gap-2 hover:bg-blue-600"
                    }
                    type="submit"
                  >
                    Payment <ArrowRightCircle />
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="p-5 bg-[#f5f5f5] text-black z-10 hidden md:block fixed bottom-0 w-full overflow-hidden">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <p>Total Items: {cart.length}</p>
            <p>Shipping: ${shipping}</p>
            <p>Subtotal: ${subtotal}</p>
            <h2 className="text-xl font-bold">Total: ${subtotal + shipping}</h2>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
