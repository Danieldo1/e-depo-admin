import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
    await connectDB();
   const ids = req.url.split("=")[1].split(",");
   const products = await Product.find({ _id: { $in: ids } });
   return NextResponse.json(products);
}