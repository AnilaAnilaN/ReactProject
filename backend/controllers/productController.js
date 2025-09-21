const Product = require("../models/Product");
const { uploadToCloudinary } = require("../utils/cloudinary");
const asyncHandler = require("../utils/asyncHandler");
const checkExists = require("../utils/checkExists");

// Create new product
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  let imageUrl = "";

  // Add validation for required fields and types
  if (!name || !price || !category) {
    res.status(400);
    throw new Error("Please enter all required fields: name, price, category");
  }
  if (isNaN(price) || price <= 0) {
    res.status(400);
    throw new Error("Price must be a positive number");
  }
  if (isNaN(stock) || stock < 0) {
    res.status(400);
    throw new Error("Stock must be a non-negative number");
  }

  if (req.file) {
    imageUrl = await uploadToCloudinary(req.file.path);
  }

  const newProduct = new Product({ name, description, price, category, stock, image: imageUrl });
  await newProduct.save();
  res.status(201).json(newProduct);
});

// Get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json(products);
});

// Get single product by ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await checkExists(Product, req.params.id, res, "Product");
  res.status(200).json(product);
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const product = await checkExists(Product, req.params.id, res, "Product");

  if (req.file) {
    product.image = await uploadToCloudinary(req.file.path);
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;
  product.stock = stock || product.stock;

  await product.save();
  res.status(200).json(product);
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  await checkExists(Product, req.params.id, res, "Product");
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
