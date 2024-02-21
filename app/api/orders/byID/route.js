import { connectDB } from "@/lib/connectDB";
import { Order } from "@/lib/models/Order";

export async function GET(req) {
  await connectDB();
  const id = await req.url.split("/").pop().split("=").pop();
  const order = await Order.findOne({ _id: id });
  return Response.json(order);
}

export async function PUT(req) {
  await connectDB();
  const id = await req.url.split("/").pop().split("=").pop();
  const { fulfilled } = await req.json();
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: id },
    { fulfilled },
  )
  return Response.json(updatedOrder);
}