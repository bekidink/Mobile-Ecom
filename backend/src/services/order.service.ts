import {Order} from "../models/order.model";
import {OrderItem} from "../models/orderItem.model";

export async function createOrder(userId: any, items: any[]) {
  try {
    // Calculate the total price for the order
    const totalPrice = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Create the order
    const newOrder = await Order.create({
      userId,
      items,
      totalPrice,
    });

    // Create order items
    const orderItems = items.map((item) => ({
      orderId: newOrder._id,
      ...item,
    }));
    await OrderItem.insertMany(orderItems);

    return { newOrder, orderItems };
  } catch (error:any) {
    throw new Error("Error creating order: " + error.message);
  }
}

export async function listOrders(role:any, userId:any, sellerId:any) {
  try {
    let filter = {};

    if (role === "admin") {
      // Admin can see all orders
    } else if (role === "seller") {
      filter = { "items.sellerId": sellerId };
    } else {
      filter = { userId };
    }

    const orders = await Order.find(filter).populate("items.productId");
    return orders;
  } catch (error:any) {
    throw new Error("Error fetching orders: " + error.message);
  }
}

export async function getOrder(id:any) {
  try {
    const order = await Order.findById(id).populate("items.productId");

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  } catch (error:any) {
    throw new Error("Error fetching order: " + error.message);
  }
}

export async function updateOrder(id:any, updateData:any) {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedOrder) {
      throw new Error("Order not found");
    }

    return updatedOrder;
  } catch (error:any) {
    throw new Error("Error updating order: " + error.message);
  }
}
