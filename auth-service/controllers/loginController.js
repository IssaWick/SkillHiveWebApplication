import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
  const { userType, email, password } = req.body;

  if (!userType || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const table = userType === 'Customer'
    ? 'customers'
    : userType === 'Service Provider'
    ? 'serviceprovider'
    : userType === 'Admin'
    ? 'admin'
    : null;

  if (!table) {
    return res.status(400).json({ error: 'Invalid user type.' });
  }

  try {
    const conn = await pool.getConnection();

    const [rows] = await conn.execute(
      `SELECT * FROM ${table} WHERE email = ?`,
      [email]
    );

    conn.release();

    if (rows.length === 0) {
      return res.status(401).json({ error: 'User not found.' });
    }

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    const payload = {
      id: user.id,
      userType,
      email: user.email
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        maxAge: 2 * 60 * 60 * 1000
      })
      .status(200)
      .json({ message: 'Login successful', userType, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};
