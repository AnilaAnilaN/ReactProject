const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // <-- add this
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // <-- add this
app.use(express.json());


// Import routes
const blogRoutes = require("./routes/blogRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Use routes
app.use("/api/blogs", blogRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
