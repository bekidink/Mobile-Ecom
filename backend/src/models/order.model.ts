import mongoose, { Document, Schema } from "mongoose";

// Helper function to define common field structure with validation rules
const commonField = <T>(
  type: T,
  required = false,
  maxLength = 255,
  customValidator?: (value: T) => boolean
) => ({
  type,
  required,
  maxlength: maxLength,
  validate: customValidator
    ? { validator: customValidator, message: `Invalid value for ${type}` }
    : undefined,
});

// Interface for the Order document
interface IOrder extends Document {
  createdAt: Date;
  status: string;
  userId: mongoose.Types.ObjectId;
  stripePaymentIntentId?: string;
}

// Order schema - Represents a customer order
const orderSchema = new Schema<IOrder>(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    status: commonField(String, true, 50),
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stripePaymentIntentId: commonField(String, false),
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create a Mongoose model for the Order schema
const Order = mongoose.model<IOrder>("Order", orderSchema);

// Validation schema for creating or updating orders
const orderValidation = {
  status: commonField(String, true, 50),
  stripePaymentIntentId: commonField(String, false),
};

export { Order, orderValidation };    export type { IOrder };

