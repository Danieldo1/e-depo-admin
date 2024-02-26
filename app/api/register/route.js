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
  const email = decodeURIComponent(req.url.split("/").pop().split("=").pop());
  console.log(email,'email');
  const users = await Person.find({ email: email });
  console.log(users,'users');
  return NextResponse.json(users);
}
