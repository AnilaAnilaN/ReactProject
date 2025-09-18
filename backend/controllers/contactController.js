// backend/controllers/contactController.js
const Contact = require("../models/Contact");
const asyncHandler = require("../utils/asyncHandler");
const checkExists = require("../utils/checkExists");

// POST /api/contact
const createContact = asyncHandler(async (req, res) => {
  const { name, email, message, image } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const newContact = new Contact({ name, email, message, image });
  await newContact.save();

  res.status(201).json({ message: "Message saved successfully!" });
});

// GET /api/contact (admin)
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// PUT /api/contact/:id/read
const markRead = asyncHandler(async (req, res) => {
  const contact = await checkExists(Contact, req.params.id, res, "Message");
  contact.read = true;
  await contact.save();
  res.json(contact);
});

module.exports = { createContact, getContacts, markRead };
