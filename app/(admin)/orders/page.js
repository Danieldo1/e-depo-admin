"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    await fetch("/api/orders").then((response) => {
      response.json().then((data) => {
        setOrders(data);
      });
    });
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orders.length / ordersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Layout>
      <h1 className="heading">Orders Page</h1>
      <div>
        {currentOrders.map((order) => {
          // Calculate the total price for the order
          const totalPrice = order.line_items.reduce((total, item) => {
            return total + item.price_data.unit_amount * item.quantity;
          }, 0);

          return (
            <Link
              href={`/orders/${order._id}`}
              className="flex my-2 gap-4 p-2 bg-blue-50 hover:bg-blue-100 justify-between items-center rounded-md"
            >
              <div className="flex flex-col">
                <h1>
                  <span className="font-bold text-base">Order Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleString().slice(0, 10)}
                </h1>
                <p>
                  <span className="font-bold text-base">Customer:</span>{" "}
                  {order.firstName} {order.lastName}
                </p>
                <p>
                  <span className="font-bold text-base">Order ID:</span>
                  {order._id}
                </p>
              </div>
              <div>
                <p
                  className={
                    order.fulfilled ? "text-green-500" : "text-red-500"
                  }
                >
                  {order.fulfilled ? "Fulfilled" : "Not Fulfilled"}
                </p>
                <p>
                  <span className="font-bold text-base">Total:</span> $
                  {totalPrice / 100}
                </p>{" "}
                <p className="text-sm text-gray-400">excl.shipping</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center gap-5 mt-3 overflow-x-auto">
        {pageNumbers.map((number) => (
          <a
            key={number}
            href="#!"
            className="font-bold hover:underline px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded-md"
            onClick={() => paginate(number)}
          >
            {number}
          </a>
        ))}
      </div>
    </Layout>
  );
};

export default OrdersPage;
