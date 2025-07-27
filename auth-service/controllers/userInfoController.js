import pool from '../config/db.js';

export const getUserInfo = async (req, res) => {
  const { email, userType } = req.query;

  if (!email || !userType) {
    return res.status(400).json({ error: 'Missing email or userType' });
  }

  const table = userType === 'Customer' ? 'customers' :
                userType === 'Service Provider' ? 'serviceprovider' :
                userType === 'Admin' ? 'admin' : null;

  if (!table) {
    return res.status(400).json({ error: 'Invalid userType' });
  }

  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.execute(`SELECT * FROM ${table} WHERE email = ?`, [email]);
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
