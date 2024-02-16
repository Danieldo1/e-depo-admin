import { connectDB } from "@/lib/connectDB";
import { Category } from "@/lib/models/Category";

export async function GET() {
    await connectDB();
        const products = await Category.find().populate("parent");
        return Response.json(products);
}

export async function POST(req) {
    await connectDB();
    const { name,parent } = await req.json();
    const newCategory = await Category.create({ name,parent });
    return Response.json(newCategory);
}

export async function PUT(req) {
    await connectDB();
    const { _id, name,parent } = await req.json();
    const updatedCategory = await Category.findOneAndUpdate(
      { _id },
      { name,parent },
     
    );
    return Response.json(updatedCategory);
}

export async function DELETE(req) {
    await connectDB();
    const { _id } = await req.json();
    const deletedCategory = await Category.findOneAndDelete({ _id });
    return Response.json(deletedCategory);
}