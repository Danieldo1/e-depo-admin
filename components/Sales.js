import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Sales = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Sales",
        data: [],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192)",
        tension: 0.1,
        pointBackgroundColor: "rgba(75, 192, 192)",
        pointBorderColor: "rgba(75, 192, 192)",
      },
    ],
  });

  const fetchAndProcessData = async () => {
    try {
      const orders = await fetch("api/orders", { cache: "no-store" }).then(
        (res) => res.json()
      ); // Fetch your orders from the database
      // Process orders to calculate daily gross sales
      const salesData = orders.reduce((acc, order) => {
        const orderDate = new Date(order.createdAt).getDate();
        if (isNaN(orderDate)) return acc;
        const orderTotal = order.line_items.reduce(
          (sum, item) => sum + item.price_data.unit_amount * item.quantity,
          0
        );

        if (!acc[orderDate]) {
          acc[orderDate] = 0;
        }
        acc[orderDate] += orderTotal / 100;
        return acc;
      }, {});

      // Convert the processed data to the format needed for the chart
      const labels = Object.keys(salesData);
      const data = Object.values(salesData);

      setChartData({
        ...chartData,
        labels,
        datasets: [{ ...chartData.datasets[0], data }],
      });
    } catch (error) {
      console.error("Error fetching or processing orders:", error);
    }
  };

  useEffect(() => {
    fetchAndProcessData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">Sales this week </h2>
      <Line data={chartData} />
    </div>
  );
};

export default Sales;
