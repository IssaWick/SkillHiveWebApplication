import db from '../config/db.js';

export const createUser = (user, callback) => {
  const sql =
    user.userType === 'Customer'
      ? `INSERT INTO customers (userType, name, age, nic, email, contact, district, city, password, profilePicture, ratings)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      : `INSERT INTO serviceprovider (userType, name, age, nic, email, contact, district, city, password, profilePicture, ratings)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    user.userType,
    user.name,
    user.age,
    user.nic,
    user.email,
    user.contact,
    user.district,
    user.city,
    user.password,
    null, // profilePicture
    null  // ratings
  ];

  db.query(sql, values, (err, result) => {
    if (err) return callback(err);
    return callback(null, result);
  });
};
