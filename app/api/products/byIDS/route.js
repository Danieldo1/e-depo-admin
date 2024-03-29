import { connectDB } from "@/lib/connectDB";
import { Product } from "@/lib/models/Product";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req) {
    await connectDB();
   const ids = decodeURIComponent(req.url.split("=")[1]).split(",");
   const products = await Product.find({ _id: { $in: ids } });
   return NextResponse.json(products);
}