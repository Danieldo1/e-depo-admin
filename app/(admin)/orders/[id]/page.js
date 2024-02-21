"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { Loader2 } from "lucide-react";

const OrderIdPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const router = useRouter();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
   if (id) {
     fetchOneOrder(id);
   }
 }, [id]);

  const fetchOneOrder = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/orders/byID?id=${id}`);
            const data = await response.json();
            setOrder(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch order:', error);
        }
    };

    if (!order) {
        return (
          <div className="w-full h-full flex justify-center items-center fixed ">
            <Loader2 className="w-6 h-6 animate-spin inset-0" />
          </div>
        );
    }

    const handleFulfillment = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/orders/byID?id=${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fulfilled: true }),
        });
        const data = await response.json();
        console.log(data);
        router.push("/orders");
      } catch (error) {
        console.error('Failed to update order:', error);
      }
    }

  return (
    <Layout>
      {loading === true ? (
        <div className="w-full h-full flex justify-center items-center fixed ">
          <Loader2 className="w-6 h-6 animate-spin inset-0" />
        </div>
      ) : (
        <main className="bg-[#f5f5f5] rounded-md shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center pt-10">
            Order Details
          </h2>
          <p className="text-xl font-bold text-center mb-3 ">
            Order ID: {order._id}
          </p>
          {order.fulfilled ? (
            <h2 className="text-2xl text-green-500 font-bold mb-6 text-center ">
              Order has been fulfilled
            </h2>
          ) : (
            <h2 className="text-2xl text-red-500 font-bold mb-6 text-center">
              Order has not been fulfilled
            </h2>
          )}
          <div className="w-full p-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="">
              <h3 className="text-xl font-semibold mb-4">Line Items:</h3>
              <div className="">
                {order.line_items.map((item, index) => (
                  <div key={index} className="mb-4 border-b-2 border-black">
                    <div className="flex justify-between mb-2">
                      <p>
                        <span className="font-bold text-base">Product:</span>{" "}
                        {item.price_data.product_data.name}
                      </p>
                      <p>
                        <span className="font-bold text-base">Qty:</span>{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <p>
                      <span className="font-bold text-base">Total Price:</span>{" "}
                      ${item.price_data.unit_amount / 100}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Customer Details:</h3>
              <p>
                <span className="font-bold text-base">Name:</span>{" "}
                {order.firstName} {order.lastName}
              </p>
              <p>
                <span className="font-bold text-base">Email:</span>{" "}
                {order.email}
              </p>
              <p>
                <span className="font-bold text-base">Phone:</span>{" "}
                {order.phone}
              </p>
              <p>
                <span className="font-bold text-base">Address:</span>{" "}
                {order.address}
              </p>
              <p>
                <span className="font-bold text-base">City:</span> {order.city}
              </p>
              <p>
                <span className="font-bold text-base">Zip:</span> {order.zip}
              </p>
              <p>
                <span className="font-bold text-base">Country:</span>{" "}
                {order.country}
              </p>
              <p>
                <span className="font-bold text-base">Status:</span>{" "}
                <span
                  className={order.paid ? "text-green-500" : "text-red-500"}
                >
                  {order.paid ? "Paid" : "Not Paid"}
                </span>
              </p>
            </div>
          </div>
        </main>
      )}
      <div className="w-full flex justify-center ">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  mx-auto mt-10"
        >
          Back
        </button>
        <button
          onClick={handleFulfillment}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded  mx-auto mt-10"
        >
          Fulfilled
        </button>
      </div>
    </Layout>
  );
};

export default OrderIdPage;
