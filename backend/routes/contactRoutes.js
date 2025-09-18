// backend/routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  markRead,
} = require("../controllers/contactController");

// Public: send message
router.post("/", createContact);

// Admin: view + manage
router.get("/", getContacts);
router.put("/:id/read", markRead);

module.exports = router;
