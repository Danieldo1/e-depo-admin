import {  NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/connectDB";
import {Order} from "@/lib/models/Order";

// export const config = { api: { bodyParser: false } };



export async function POST(req) {
  await connectDB();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2023-10-16",
  });
  const sig = req.headers.get("stripe-signature") || "";
  const signingSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET || "";

  // Read the request body as text
  const reqText = await req.text();
  // Convert the text to a buffer
  const reqBuffer = Buffer.from(reqText);

  let event;
  try {
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signingSecret);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err) {
    return new NextResponse(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      if (paid && orderId) {
        await Order.findByIdAndUpdate(orderId, { paid: true });
      }
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
      break;
  }

  return NextResponse.json({ received: true });
}
