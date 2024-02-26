import { connectDB } from "@/lib/connectDB";
import { Order } from "@/lib/models/Order";

export async function GET(req) {
  await connectDB();
  const email = decodeURIComponent(req.url.split("/").pop().split("=").pop());
  const orders = await Order.find({ user: email });
  return Response.json(orders);
}
