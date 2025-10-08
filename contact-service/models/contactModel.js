const db = require("../config/db");

const Contact = {
  create: (data, callback) => {
    const sql = "INSERT INTO contactus (name, email, subject, message) VALUES (?, ?, ?, ?)";
    db.query(sql, [data.name, data.email, data.subject, data.message], callback);
  }
};

module.exports = Contact;
