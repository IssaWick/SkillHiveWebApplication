import pool from '../config/db.js';
import { insertCustomer } from '../models/customerModel.js';
import { insertServiceProvider } from '../models/serviceProviderModel.js';

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

    const values = [userType, name, age, nic, email, contact, district, city, password];

    if (userType === 'Customer') {
      await insertCustomer(conn, values);
    } else if (userType === 'Service Provider') {
      await insertServiceProvider(conn, values);
    } else {
      return res.status(400).json({ error: 'Invalid userType' });
    }

    conn.release();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signup failed' });
  }
};
