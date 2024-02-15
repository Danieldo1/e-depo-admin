import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models/Product";

export async function POST(req) {
  await connectDB();
  const { title, description, price } = await req.json();
  const newProduct = await Product.create({ title, description, price });
  return Response.json(newProduct);
}

export async function GET() {
  await connectDB();
    const products = await Product.find();
    return Response.json(products);
  }

