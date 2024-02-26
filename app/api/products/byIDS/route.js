import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
    await connectDB();
   const ids = decodeURIComponent(req.url.split("=")[1]).split(",");
   console.log(ids, "ids");
   const products = await Product.find({ _id: { $in: ids } });
   console.log(products, "products");
   return NextResponse.json(products);
}