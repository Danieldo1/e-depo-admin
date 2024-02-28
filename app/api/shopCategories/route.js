import { connectDB } from "@/lib/connectDB";
import { Category } from "@/lib/models/Category";
export const dynamic = "force-dynamic";
export async function GET() {
  await connectDB();
  const products = await Category.find().sort({ order: 1 });
  return Response.json(products);
}
