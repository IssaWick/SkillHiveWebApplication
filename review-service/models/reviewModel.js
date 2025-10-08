const db = require("../config/db");

const Review = {
  create: (data, callback) => {
    const sql = "INSERT INTO reviewform (stars, message, user_id, user_name, user_email) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [data.stars, data.message, data.user_id, data.user_name, data.user_email], callback);
  },

  getAll: (callback) => {
    const sql = "SELECT * FROM reviewform ORDER BY created_at DESC";
    db.query(sql, callback);
  },
};

module.exports = Review;
