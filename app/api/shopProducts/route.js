import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models/Product";

export async function GET() {
  await connectDB();
  const products = await Product.find({},null,{sort:{_id:-1},limit:5});
  return Response.json(products);
}
