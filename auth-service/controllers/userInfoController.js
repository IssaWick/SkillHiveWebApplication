import pool from '../config/db.js';

export const getUserInfo = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.execute(`SELECT id, name, email, nic, contact, age, district, city, profilePicture, ratings, userType FROM user WHERE email = ?`, [email]);
    conn.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the single user object directly
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve user info' });
  }
};


// GET user by ID
export const getUserInfoById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Missing user ID' });
  }

  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.execute(
      `SELECT id, name, email, nic, contact, age, district, city, profilePicture, ratings, userType 
       FROM user 
       WHERE id = ?`,
      [id]
    );
    conn.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve user info' });
  }
};
