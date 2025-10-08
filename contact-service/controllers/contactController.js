const Contact = require("../models/contactModel");

exports.submitContactForm = (req, res) => {
  const { name, email, subject, message } = req.body;

  Contact.create({ name, email, subject, message }, (err, result) => {
    if (err) {
      console.error("❌ Error saving contact form:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    res.json({ success: true, message: "Your message has been saved successfully!" });
  });
};
