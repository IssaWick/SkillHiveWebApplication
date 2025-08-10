import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const getProfile = async (req, res) => {
  const { email } = req.user; // decoded from JWT

  try {
    const response = await axios.get(`${process.env.AUTH_SERVICE_URL}/api/user-info`, {
      params: { email }
    });

    if (response.status === 200) {
      // Directly return the user data, not nested
      return res.json(response.data);
    }

    res.status(404).json({ error: 'User not found' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};
