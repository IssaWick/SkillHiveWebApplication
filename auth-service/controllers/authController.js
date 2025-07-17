import bcrypt from 'bcrypt';
import { createUser } from '../models/userModel.js';

export const signup = async (req, res) => {
  try {
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

    if (userType !== 'Customer' && userType !== 'Service Provider') {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      userType,
      name,
      age,
      nic,
      email,
      contact,
      district,
      city,
      password: hashedPassword
    };

    createUser(user, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
