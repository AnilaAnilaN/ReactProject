const express = require("express");
const router = express.Router();

// Import controller correctly
const { createContact } = require("../controllers/contactController");

// Route: POST /api/contact
router.post("/", createContact);

module.exports = router;
