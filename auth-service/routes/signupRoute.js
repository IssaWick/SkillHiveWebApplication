import express from 'express';
import { signup } from '../controllers/signupController.js';
import db from '../config/db.js';

const router = express.Router();

// Sign up route
router.post('/signup', signup);

// Check if email already exists in 'user' table
router.post('/check-email', async (req, res) => {
  const { email } = req.body;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM user WHERE email = ?',
      [email]
    );

    res.json({ exists: rows.length > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
