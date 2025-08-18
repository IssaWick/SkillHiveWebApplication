import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
  const { userType, email, password } = req.body;

  if (!userType || !email || !password) {
    return res.status(400).json({ error: 'User type, email, and password are required.' });
  }

  try {
    const conn = await pool.getConnection();

    if (userType === 'User') {
      // Existing USER login logic (Customer / Service Provider)
      const [rows] = await conn.execute('SELECT * FROM user WHERE email = ?', [email]);

      if (rows.length === 0) {
        conn.release();
        return res.status(401).json({ error: 'User not found.' });
      }

      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        conn.release();
        return res.status(401).json({ error: 'Incorrect password.' });
      }

      const payload = {
        id: user.id,
        email: user.email,
        userType: user.userType
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

      conn.release();
      return res
        .cookie('token', token, {
          httpOnly: true,
          secure: false,
          sameSite: 'Lax',
          maxAge: 2 * 60 * 60 * 1000
        })
        .status(200)
        .json({ message: 'Login successful', token, userType: user.userType });
    }

    else if (userType === 'Admin') {
      // ADMIN login logic
      const [rows] = await conn.execute('SELECT * FROM admin WHERE email = ?', [email]);

      if (rows.length === 0) {
        conn.release();
        return res.status(401).json({ error: 'Admin not found.' });
      }

      const admin = rows[0];
      // Plain text password check for admin
      if (password !== admin.password) {
        conn.release();
        return res.status(401).json({ error: 'Incorrect password.' });
      }

      const payload = {
        id: admin.id,
        email: admin.email,
        userType: 'Admin'
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

      conn.release();
      return res
        .cookie('token', token, {
          httpOnly: true,
          secure: false,
          sameSite: 'Lax',
          maxAge: 2 * 60 * 60 * 1000
        })
        .status(200)
        .json({ message: 'Admin login successful', token, userType: 'Admin' });
    }

    else {
      conn.release();
      return res.status(400).json({ error: 'Invalid user type.' });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Login failed.' });
  }
};
