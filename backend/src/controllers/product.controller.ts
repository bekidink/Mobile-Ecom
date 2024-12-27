import { Request, Response } from "express";
import  Product  from "../models/product.model"; // Import Mongoose Product model

// List all products
export async function listProducts(req: Request, res: Response): Promise<void> {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error fetching products", error: e });
  }
}

// Get a single product by ID
export async function getProductById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error fetching product", error: e });
  }
}

// Create a new product
export async function createProduct(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const newProduct = new Product(req.body); // Create product with request body data
    await newProduct.save();
    res.status(201).json(newProduct); // Return the created product
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error creating product", error: e });
  }
}

// Update an existing product
export async function updateProduct(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    const updatedFields = req.body;

    const product = await Product.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!product) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error updating product", error: e });
  }
}

// Delete a product
export async function deleteProduct(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (deletedProduct) {
      res.status(204).send(); // No content to return, just success
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error deleting product", error: e });
  }
}
