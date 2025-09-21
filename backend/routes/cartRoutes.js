const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require('../controllers/cartController');

router.route('/').get(protect, getCart).post(protect, addToCart).delete(protect, clearCart);
router.route('/:id').put(protect, updateCartItem).delete(protect, removeCartItem);

module.exports = router;
