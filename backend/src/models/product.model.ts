import mongoose, { Document } from "mongoose";

// Interface for Product Document
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

// Product Schema Definition
const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 255,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      maxlength: 255,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Product Model
const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
