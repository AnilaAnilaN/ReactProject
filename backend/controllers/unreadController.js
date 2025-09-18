const asyncHandler = require("../utils/asyncHandler");
const Order = require("../models/Order");
const Contact = require("../models/Contact");

const getUnreadCounts = asyncHandler(async (req, res) => {
  const unreadMessages = await Contact.countDocuments({ read: false });
  const unreadOrders = await Order.countDocuments({ read: false });
  res.json({ unreadMessages, unreadOrders });
});

module.exports = { getUnreadCounts };
