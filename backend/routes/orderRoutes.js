// backend/routes/orderRoutes.js
const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  markOrderRead,
  getMyOrders,
  cancelOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", getOrders);
router.get("/myorders", protect, getMyOrders); // New route for user's orders
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);
router.put("/:id/cancel", protect, cancelOrder); // New route to cancel an order
router.put("/:id/read", markOrderRead);

module.exports = router;
