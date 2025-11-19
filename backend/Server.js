const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const blogRoutes = require("./routes/blogRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const unreadRoutes = require("./routes/unreadRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Use routes
app.use("/api/blogs", blogRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/unread", unreadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

const path = require('path');

// Serve frontend for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../mestore/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../mestore/dist/index.html'));
  });
}

// 404 and error handling
app.use((req, res, next) => {
  res.status(404);
  throw new Error("Route not found");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
