import mongoose, { Document, Schema } from "mongoose";

// Helper function to define common field structure with validation rules
const commonField = <T>(
  type: T,
  required = false,
  maxLength = 255,
  customValidator?: (value: any) => boolean
) => ({
  type,
  required,
  maxlength: maxLength,
  validate: customValidator
    ? { validator: customValidator, message: `Invalid value for ${type}` }
    : undefined,
});

// Interface for the OrderItem document
interface IOrderItem extends Document {
  orderId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

// OrderItem schema - Represents an individual product/item in the order
const orderItemSchema = new Schema<IOrderItem>(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: commonField(Number, true, 255, (value: number) => value > 0), // Custom validator ensures quantity is greater than 0
    price: commonField(Number, true, 255, (value: number) => value > 0), // Custom validator ensures price is greater than 0
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create a Mongoose model for the OrderItem schema
const OrderItem = mongoose.model<IOrderItem>("OrderItem", orderItemSchema);

// Validation schema for creating or updating order items
const orderItemValidation = {
  productId: commonField(String, true),
  quantity: commonField(Number, true, 255, (value: number) => value > 0),
  price: commonField(Number, true, 255, (value: number) => value > 0),
};

export { OrderItem, orderItemValidation };    export type { IOrderItem };

