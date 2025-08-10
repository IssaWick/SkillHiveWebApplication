import pool from '../config/db.js';
import { insertUser } from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
  const {
    userType,
    name,
    age,
    nic,
    email,
    contact,
    district,
    city,
    password
  } = req.body;

  try {
    const conn = await pool.getConnection();

    const hashedPassword = await bcrypt.hash(password, 10);

    const values = [userType, name, age, nic, email, contact, district, city, hashedPassword];

    await insertUser(conn, values);

    conn.release();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signup failed' });
  }
};
