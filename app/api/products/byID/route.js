import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models/Product";

export async function GET(req) {
    await connectDB();
    const id =await req.url.split("/").pop().split('=').pop();
      const products = await Product.findOne({ _id: id });
      return Response.json(products);
    }
  
  export async function DELETE(req) {
    await connectDB();
    const id =await req.url.split("/").pop().split('=').pop();
    const deletedProduct = await Product.findOneAndDelete({ _id: id });
    return Response.json(deletedProduct);
  }