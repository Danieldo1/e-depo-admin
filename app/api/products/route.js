import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models/Product";

export async function POST(req) {
  await connectDB();
  const { title, description, price,images } = await req.json();
  const newProduct = await Product.create({ title, description, price,images });
  return Response.json(newProduct);
}

export async function GET() {
  await connectDB();
    const products = await Product.find();
    return Response.json(products);
  }

export async function PUT(req) {
  await connectDB();
  const { _id, title, description, price,images } = await req.json();
  const updatedProduct = await Product.findOneAndUpdate(
    { _id },
    { title, description, price,images },
   
  );
  return Response.json(updatedProduct);
}