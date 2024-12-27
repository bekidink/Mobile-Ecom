import { Request, Response } from "express";
import {
  createPaymentIntentService,
  handleStripeWebhook,
} from "../services/payment.service";

export async function getKeys(req: Request, res: Response) {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
}

export async function createPaymentIntent(req: Request, res: Response) {
  try {
    const { orderId } = req.body;
    const paymentData = await createPaymentIntentService(orderId);
    res.json(paymentData);
  } catch (err) {
    console.error("Error creating payment intent:", err);
    res.status(500).send({ message: "Payment creation failed" });
  }
}

export async function webhook(req: Request, res: Response) {
  try {
    await handleStripeWebhook(req, res);
  } catch (err) {
    console.error("Error handling webhook:", err);
    res.status(400).send({ message: "Webhook handling failed" });
  }
}
