const express = require("express");
const { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} = require("../controllers/productController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
