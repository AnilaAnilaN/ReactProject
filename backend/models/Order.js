const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
  },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: "COD" },
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  read: { type: Boolean, default: false } // for admin notification badge
}, { timestamps: true });

orderSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);