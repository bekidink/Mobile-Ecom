import Stripe from "stripe";

import { Request, Response } from "express";
import {Order} from "../models/order.model"
import {OrderItem} from "../models/orderItem.model"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET!;

export async function createPaymentIntentService(orderId: string) {
  // Fetch order items from the database
  const orderItems = await OrderItem
    .find({  orderId })
    ;

  // Calculate total price
  const total = orderItems.reduce(
    (sum: number, item: { price: number; quantity: number; }) => sum + item.price * item.quantity,
    0
  );
  const amount = Math.floor(total * 100); // Convert to cents

  if (amount === 0) {
    throw new Error("Order total is 0");
  }

  // Create a new customer in Stripe
  const customer = await stripe.customers.create();

  // Create an ephemeral key for Stripe client
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-09-30" }
  );

  // Create the PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    customer: customer.id,
  });

  // Store the payment intent ID in the orders collection
  await Order.updateOne(
    { _id: orderId },
    { $set: { stripePaymentIntentId: paymentIntent.id } }
  );

  return {
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  };
}

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig:any = req.headers["stripe-signature"]; 

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody!, sig, endpointSecret);
  } catch (err) {
    throw new Error(`Webhook Error: ${(err as Error).message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await Order.updateOne(
        { stripePaymentIntentId: paymentIntent.id },
        { $set: { status: "paid" } }
      );
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await Order.updateOne(
        { stripePaymentIntentId: paymentIntent.id },
        { $set: { status: "payment_failed" } }
      );
      break;
    }
    case "payment_method.attached": {
      const paymentMethod = event.data.object as Stripe.PaymentMethod;
      console.log("Payment method attached:", paymentMethod.id);
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}
