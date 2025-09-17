const Contact = require("../models/Contact");

const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save to DB only
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: "Message saved successfully!" });
  } catch (error) {
    console.error("Error in contactController:", error);
    res.status(500).json({ error: "Server error, please try again." });
  }
};

module.exports = { createContact };
