const asyncHandler = require("../utils/asyncHandler");
const Order = require("../models/Order");
const Product = require("../models/Product");
const checkExists = require("../utils/checkExists");

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { items, paymentMethod } = req.body;

  // Ensure there is a logged-in user
  if (!req.user) {
    res.status(401);
    throw new Error("Authentication required to create an order.");
  }

  const customer = {
    name: req.user.name,
    email: req.user.email,
    phone: req.user.phone,
    address: req.user.address,
  };

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400);
    throw new Error("Invalid order: items are missing or empty.");
  }

  // Recalculate total from DB to avoid tampering
  let total = 0;
  const validatedItems = [];

  for (const it of items) {
    if (!it.product) {
      res.status(400);
      throw new Error("Invalid item: product ID is missing.");
    }
    const p = await Product.findById(it.product);
    if (!p) {
      res.status(404);
      throw new Error(`Product with ID ${it.product} not found.`);
    }
    const qty = Number(it.quantity) || 1;
    if (qty <= 0) {
      res.status(400);
      throw new Error(`Invalid quantity for product ${p.name}.`);
    }
    const price = Number(p.price);
    total += price * qty;
    validatedItems.push({
      product: p._id,
      name: p.name,
      price,
      quantity: qty,
    });
  }

  const order = new Order({
    customer,
    items: validatedItems,
    total,
    paymentMethod: paymentMethod || "COD",
  });

  await order.save();

  res.status(201).json(order);
});

// @desc    Get all orders for the logged-in user
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ "customer.email": req.user.email }).sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Cancel an order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await checkExists(Order, req.params.id, res, "Order");

  if (order.customer.email !== req.user.email) {
    res.status(403);
    throw new Error("Not authorized to cancel this order.");
  }

  if (order.status !== "pending") {
    res.status(400);
    throw new Error("Only pending orders can be cancelled.");
  }

  order.status = "cancelled";
  await order.save();
  res.json(order);
});

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 20);
  const filter = req.query.status ? { status: req.query.status } : {};

  const orders = await Order.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
    
  res.json(orders);
});

// @desc    Get a single order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await checkExists(Order, req.params.id, res, "Order");
  await order.populate("items.product", "name price");
  res.json(order);
});

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!status) {
    res.status(400);
    throw new Error("Status is required.");
  }
  const order = await checkExists(Order, req.params.id, res, "Order");
  order.status = status;
  await order.save();
  res.json(order);
});

// @desc    Mark an order as read (admin)
// @route   PUT /api/orders/:id/read
// @access  Private/Admin
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
  getMyOrders,
  cancelOrder,
};