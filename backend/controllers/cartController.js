const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

// Helper function to calculate and save cart total
const calculateCartTotal = async (cart) => {
  await cart.populate('items.product', 'price');
  const total = cart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  cart.total = total;
  return cart.save();
};

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product', '_id name price image');
  if (cart) {
    res.status(200).json(cart);
  } else {
    // If no cart, create one
    const newCart = await Cart.create({ user: req.user._id, items: [], total: 0 });
    res.status(200).json(newCart);
  }
});

// @desc    Add or update item in cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [], total: 0 });
  }

  const itemIndex = cart.items.findIndex((p) => p.product.toString() === productId);

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  const updatedCart = await calculateCartTotal(cart);
  await updatedCart.populate('items.product', '_id name price image');

  res.status(200).json(updatedCart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeCartItem = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter((p) => p.product.toString() !== productId);

  const updatedCart = await calculateCartTotal(cart);
  await updatedCart.populate('items.product', '_id name price image');

  res.status(200).json(updatedCart);
});

// @desc    Clear user cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = [];
    const updatedCart = await calculateCartTotal(cart);
    res.status(200).json(updatedCart);
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const productId = req.params.id;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
    const updatedCart = await calculateCartTotal(cart);
    await updatedCart.populate('items.product', '_id name price image');
    res.status(200).json(updatedCart);
  } else {
    res.status(404);
    throw new Error('Item not found in cart');
  }
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
