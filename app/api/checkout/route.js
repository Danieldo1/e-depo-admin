import { connectDB } from "@/lib/connectDB";
import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
    user,
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
      unit_amount: product.price * 100,
      product_data: {
        name: product.title,
      },
    },
    quantity: productQuantities[product._id.toString()],
  }));

  const orderRes = await Order.create({
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
    user: user,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    shipping_options: [
      {
        shipping_rate: "shr_1Om7dCIjbKjeemoL5a9HkhFC",
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/`,
    metadata: {
      orderId: orderRes._id.toString(),
    },
    customer_email: email,
  });
  
  return Response.json({ url: session.url });
}
