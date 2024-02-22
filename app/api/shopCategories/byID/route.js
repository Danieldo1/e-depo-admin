import { connectDB } from "@/lib/connectDB";
import { Category } from "@/lib/models/Category";

export async function GET(req) {
  await connectDB();
  const id = await req.url.split("/").pop().split("=").pop();
  console.log(id)
  const category = await Category.findOne({ _id: id });
  return Response.json(category);
}
