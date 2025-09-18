// backend/controllers/orderController.js
const Order = require("../models/Order");
const Product = require("../models/Product"); // to verify prices
const asyncHandler = require("../utils/asyncHandler");
const checkExists = require("../utils/checkExists");

// Create order
const createOrder = asyncHandler(async (req, res) => {
  const { customer, items } = req.body;
  if (!customer || !items || !Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("Invalid order payload");
  }

  // Recalculate total from DB to avoid tampering
  let total = 0;
  const validatedItems = [];

  for (const it of items) {
    const p = await Product.findById(it.product);
    if (!p) {
      res.status(400);
      throw new Error(`Product ${it.product} not found`);
    }
    const qty = Number(it.quantity) || 1;
    const price = Number(p.price);
    total += price * qty;
    validatedItems.push({
      product: p._id,
      name: p.name,
      price,
      quantity: qty
    });
  }

  const order = new Order({
    customer,
    items: validatedItems,
    total,
    paymentMethod: req.body.paymentMethod || "COD"
  });

  await order.save();

  // optionally: emit notification, send email to admin, etc.
  res.status(201).json(order);
});

// List orders with optional pagination/filter
const getOrders = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 20);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const orders = await Order.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
  res.json(orders); // <-- return array only
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await checkExists(Order, req.params.id, res, "Order");
  await order.populate("items.product", "name price");
  res.json(order);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!status) {
    res.status(400);
    throw new Error("status required");
  }
  const order = await checkExists(Order, req.params.id, res, "Order");
  order.status = status;
  await order.save();
  res.json(order);
});

const markOrderRead = asyncHandler(async (req, res) => {
  const order = await checkExists(Order, req.params.id, res, "Order");
  order.read = true;
  await order.save();
  res.json(order);
});

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  markOrderRead,
};