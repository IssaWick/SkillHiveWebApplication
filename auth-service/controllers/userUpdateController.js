import pool from '../config/db.js';

export const userUpdate = async (req, res) => {
  const { id, name, age, nic, email, contact, district, city, profilePicture } = req.body;

  if (!id) return res.status(400).json({ error: 'User ID is required' });

  try {
    const conn = await pool.getConnection();

    // Check uniqueness for nic
    const [nicRows] = await conn.execute(
      'SELECT id FROM user WHERE nic = ? AND id != ?',
      [nic, id]
    );
    if (nicRows.length > 0) {
      conn.release();
      return res.status(409).json({ error: 'NIC already exists' });
    }

    // Check uniqueness for email
    const [emailRows] = await conn.execute(
      'SELECT id FROM user WHERE email = ? AND id != ?',
      [email, id]
    );
    if (emailRows.length > 0) {
      conn.release();
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Check uniqueness for contact
    const [contactRows] = await conn.execute(
      'SELECT id FROM user WHERE contact = ? AND id != ?',
      [contact, id]
    );
    if (contactRows.length > 0) {
      conn.release();
      return res.status(409).json({ error: 'Contact already exists' });
    }

    // Update user
    const sqlUpdate = `
      UPDATE user SET
        name = ?,
        age = ?,
        nic = ?,
        email = ?,
        contact = ?,
        district = ?,
        city = ?,
        profilePicture = COALESCE(?, profilePicture)
      WHERE id = ?
    `;

    await conn.execute(sqlUpdate, [
      name,
      age,
      nic,
      email,
      contact,
      district,
      city,
      profilePicture || null,
      id,
    ]);

    conn.release();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while updating user' });
  }
};
