import { Person } from "../../../lib/models/Person";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const user = await Person.create(body);
  return Response.json(user);
}

export async function GET(req) {
  await connectDB();
  const email = req.url.split("/").pop().split("=").pop();
  const users = await Person.find({ email: email });
  return NextResponse.json(users);
}
