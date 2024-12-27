import { IProduct } from "../models/product.model";
import  Product  from "../models/product.model"; // Import the Product model

// List all products
export const listProducts = async (): Promise<IProduct[]> => {
  try {
    return await Product.find();
  } catch (e) {
    throw new Error("Error fetching products");
  }
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<IProduct | null> => {
  try {
    return await Product.findById(id);
  } catch (e) {
    throw new Error("Error fetching product");
  }
};

// Create a new product
export const createProduct = async (
  productData: any
): Promise<IProduct > => {
  try {
    const newProduct = new Product(productData);
    return await newProduct.save();
  } catch (e) {
    throw new Error("Error creating product");
  }
};

// Update an existing product
export const updateProduct = async (
  id: string,
  updatedFields: Partial<IProduct>
): Promise<IProduct | null> => {
  try {
    return await Product.findByIdAndUpdate(id, updatedFields, { new: true });
  } catch (e) {
    throw new Error("Error updating product");
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (e) {
    throw new Error("Error deleting product");
  }
};
