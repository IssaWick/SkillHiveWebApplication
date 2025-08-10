export const insertUser = async (conn, data) => {
  const sql = `
    INSERT INTO user (userType, name, age, nic, email, contact, district, city, password, profilePicture, ratings)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL)
  `;
  await conn.execute(sql, data);
};
