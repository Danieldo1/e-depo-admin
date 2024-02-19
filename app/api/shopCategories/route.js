import { connectDB } from "@/lib/connectDB";
import { Category } from "@/lib/models/Category";

export async function GET() {
  await connectDB();
  const products = await Category.find({},null,{sort:{_id:-1},limit:5});
  return Response.json(products);
}
