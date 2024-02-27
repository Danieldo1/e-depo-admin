import { connectDB } from "@/lib/connectDB";
import { Order } from "@/lib/models/Order";

export async function GET() {
 await connectDB();
 const orders = await Order.find().sort({createdAt:-1});
// console.log(orders[20].line_items[0]);
 return Response.json(orders);   
}