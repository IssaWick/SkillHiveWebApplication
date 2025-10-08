const Review = require("../models/reviewModel");

exports.createReview = (req, res) => {
  const { stars, message } = req.body;
  
  console.log("📝 Review submission attempt:", { stars, message });
  
  if (!stars) {
    return res.status(400).json({ error: "Stars are required" });
  }

  const jwt = require('jsonwebtoken');

let userId = null;
let userName = 'Anonymous';
let userEmail = 'anonymous@example.com';

// Extract token from Authorization header
const authHeader = req.headers['authorization'];
if (authHeader) {
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.id;
    userName = decoded.name || 'Anonymous';
    userEmail = decoded.email || 'anonymous@example.com';
  } catch (err) {
    console.error('Invalid token:', err);
  }
}

const reviewData = {
  stars,
  message,
  user_id: userId,       // now comes from logged-in user
  user_name: userName,
  user_email: userEmail
};


  console.log("💾 Saving review data:", reviewData);

  Review.create(reviewData, (err, result) => {
    if (err) {
      console.error("❌ Error saving review:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("✅ Review saved successfully:", result);
    res.status(201).json({ success: true, reviewId: result.insertId });
  });
};

exports.getReviews = (req, res) => {
  Review.getAll((err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(200).json(results);
  });
};
