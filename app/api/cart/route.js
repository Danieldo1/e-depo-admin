import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models/Product";

export async function GET(req) {
  await connectDB();
  const ids = req.url.split("=")[1].split(",");
  const products = await Product.find({ _id: { $in: ids } }); // Find products with matching IDs
  return Response.json(products); // Return the array of products as JSON
}