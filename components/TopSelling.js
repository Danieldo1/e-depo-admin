import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const TopSelling = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Quantity Sold",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
    
  });

  useEffect(() => {
    fetchAndProcessData();
  }, []);


  function truncateDescription(description) {
    const words = description.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return description;
  }
  const fetchAndProcessData = async () => {
    const response = await fetch("api/orders", { cache: "no-store" });
    const orders = await response.json();

    const itemSales = {};

    orders.forEach((order) => {
      order.line_items.forEach((item) => {
        const itemName = truncateDescription(item.price_data.product_data.name);
        if (itemName) {
          if (!itemSales[itemName]) {
            itemSales[itemName] = 0;
          }
          itemSales[itemName] += item.quantity;
        }
      });
    });

    const sortedItems = Object.entries(itemSales).sort((a, b) => b[1] - a[1]);
    const topItems = sortedItems.slice(0, 5);

    setChartData({
      labels: topItems.map((item) => item[0]),
      datasets: [
        {
          ...chartData.datasets[0],
          data: topItems.map((item) => item[1]),
        },
      ],
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">Top Selling</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default TopSelling;
