import { connectDB } from "@/lib/connectDB";
import { Order } from "@/lib/models/Order";
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
  const productQuantities = products.reduce((acc, productId) => {
    acc[productId] = (acc[productId] || 0) + 1;
    return acc;
  }, {});

   const uniqueProductIds = Object.keys(productQuantities);

   const productsData = await Product.find({ _id: { $in: uniqueProductIds } });

   let line_items = productsData.map((product) => ({
     price_data: {
       currency: "USD",
       unit_amount: product.price * productQuantities[product._id.toString()],
       product_data: {
         name: product.title,
       },
     },
     quantity: productQuantities[product._id.toString()],
   }));

  const orderRes= await Order.create({
     line_items,
     firstName,
     lastName,
     email,
     phone,
     city,
     zip,
     address,
     country,
     paid: false,
   })


   
}