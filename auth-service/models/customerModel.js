export const insertCustomer = async (conn, data) => {
  const sql = `
    INSERT INTO customers (userType, name, age, nic, email, contact, district, city, password, profilePicture, ratings)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL)
  `;
  await conn.execute(sql, data);
};
