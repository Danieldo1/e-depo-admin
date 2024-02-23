
import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models/Product";

export async function GET(req) {
  await connectDB();
  const id = await req.url.split("/").pop().split("=").pop();
  const products = await Product.find({ category: id });
  return Response.json(products);
}
