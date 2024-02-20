import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models/Product";

export async function POST(req) {
  const {
    firstName,
    lastName,
    email,
    phone,
    city,
    zip,
    address,
    country,
    products,
  } = await req.json();
  await connectDB();
  const productIds = products.map((productId) => {
    return {
      productId,
    };
  });
  const uniqueIds = [...new Set(productIds)];

  const productInfoID = uniqueIds.map((product) => product.productId);

  const productsData = await Product.find({ _id: { $in: productInfoID } });
  let line_item = [];
  for (const productId of productInfoID) {
    const data = productsData.find(
      (product) => product._id.toString() === productId
    );
    const qty = products.filter((id) => id === productId).length || 0; // calculate qty based on productIds
    if (qty > 0 && data) {
      line_item.push({
        price_data: {
          currency: "USD",
          unit_amount: data.price,
          product_data: {
            name: data.title,
          },
          unit_amount: data.price,
        },
        quantity: qty,
      });
    }
  }
  console.log(line_item, "line_itemPRICE");
  return Response.json({ line_item });
}