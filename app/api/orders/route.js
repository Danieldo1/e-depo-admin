import { connectDB } from "@/lib/connectDB";
import { Order } from "@/lib/models/Order";

export async function GET() {
 await connectDB();
 const orders = await Order.find().sort({createdAt:-1});
 return Response.json(orders);   
}