import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const OrderValueRangesChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Order Value Ranges",
        data: [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  });

  useEffect(() => {
      
      fetchAndProcessData();
    }, []);
    const fetchAndProcessData = async () => {
      const response = await fetch("api/orders", { cache: "no-store" });
      const orders = await response.json();

      // Calculate the total value of each order and categorize it
      const orderValues = orders.map((order) =>
        order.line_items.reduce(
          (total, item) => total + item.price_data.unit_amount/100 * item.quantity,
          0
        )
      );

      // Define ranges for the AOV
      const ranges = [0, 20, 50, 100, 200, Number.MAX_SAFE_INTEGER];
      const rangeLabels = [
        "< $20",
        "$20 - $50",
        "$50 - $100",
        "$100 - $200",
        "> $200",
      ];
      const rangeCounts = new Array(ranges.length - 1).fill(0);

      // Count the orders in each range
      orderValues.forEach((value) => {
        const index = ranges.findIndex(
          (range, i, arr) => value >= range && value < arr[i + 1]
        );
        if (index !== -1) {
          rangeCounts[index]++;
        }
      });

      // Update chart data
      setChartData({
        labels: rangeLabels,
        datasets: [
          {
            ...chartData.datasets[0],
            data: rangeCounts,
          },
        ],
      });
    };

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">Order Value Ranges</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default OrderValueRangesChart;
