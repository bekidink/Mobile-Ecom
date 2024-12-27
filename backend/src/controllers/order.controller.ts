import { Request, Response } from "express";
import * as orderService from "../services/order.service";

export async function createOrder(req:Request, res:Response) {
  try {
    const { order, items } = req.body;
    const userId = req.userId; // Assuming userId is available in req.userId (auth middleware)

    if (!userId) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const { newOrder, orderItems } = await orderService.createOrder(
      userId,
      items
    );
    res.status(201).json({ ...newOrder.toJSON(), items: orderItems });
  } catch (error:any) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error creating order", error: error.message });
  }
}

export async function listOrders(req: any, res: Response) {
  try {
    const { role, userId, sellerId } = req.user; // Assuming user data is available in req.user
    const orders = await orderService.listOrders(role, userId, sellerId);
    res.status(200).json(orders);
  } catch (error:any) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
}

export async function getOrder(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const order = await orderService.getOrder(id);
    res.status(200).json(order);
  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const updatedOrder = await orderService.updateOrder(id, req.body);
    res.status(200).json(updatedOrder);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
}
