
import {Person }from "../../../lib/models/Person" // replace with your actual Person model
import { connectDB } from "@/lib/connectDB";

export  async function POST(req) {
    await connectDB();
    const body = await req.json();
    const user = await Person.findOneAndUpdate(
        { email: body.email },
        { $addToSet: { whishList: body.productId } }
    );
    return Response.json(user);
}

export async function DELETE(req) {
    await connectDB();
    const body = await req.json();
    const user = await Person.findOneAndUpdate(
        { email: body.email },
        { $pull: { whishList: body.productId } }
    );
    return Response.json(user);
}

export async function GET(req) {
    await connectDB();
    const email = req.url.split("/").pop().split("=").pop();
    const users = await Person.find( { email: email });
    return Response.json(users);
}