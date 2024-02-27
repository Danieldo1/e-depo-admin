import { connectDB } from "@/lib/connectDB";
import { Category } from "@/lib/models/Category";
export const dynamic = "force-dynamic";
export async function GET(req) {
  await connectDB();
  const id = await req.url.split("/").pop().split("=").pop();
  const category = await Category.findOne({ _id: id });
  return Response.json(category);
}
