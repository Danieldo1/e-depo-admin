import { Person } from "../../../lib/models/Person";
import { connectDB } from "@/lib/connectDB";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const user = await Person.create(body);
  return Response.json(user);
}
