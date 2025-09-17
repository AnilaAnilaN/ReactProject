const express = require("express");
const { createProduct } = require("../controllers/productController");
const upload = require("../middleware/upload");

const router = express.Router();

// Upload product image to Cloudinary
router.post("/", upload.single("image"), createProduct);

module.exports = router;
