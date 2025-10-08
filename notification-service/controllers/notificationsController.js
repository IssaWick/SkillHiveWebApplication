// controllers/notificationsController.js
import pool from '../config/db.js';

// Get notifications (now from reviewform table)
export const getNotifications = async (req, res) => {
  const { userId } = req.query;
  const { filter } = req.query;

  console.log("🔹 Received request for notifications:", { userId, filter });

  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const conn = await pool.getConnection();
    let sql = "SELECT * FROM reviewform WHERE user_id = ?";
    const params = [userId];

    if (filter === "unread") sql += " AND is_read = false";
    if (filter === "system") sql += " AND type = 'system'";

    sql += " ORDER BY created_at DESC";

    console.log("🔹 Executing SQL:", sql, "with params:", params);

    const [rows] = await conn.execute(sql, params);
    conn.release();

    console.log("🔹 Query result:", rows);

    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Error fetching notifications:", err);
    res.status(500).json({ error: "Failed to get notifications", details: err.message });
  }
};

// Mark a notification as read (update reviewform table)
export const markAsRead = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Missing notification id" });

  try {
    const conn = await pool.getConnection();
    await conn.execute("UPDATE reviewform SET is_read = true WHERE id = ?", [id]);
    conn.release();

    res.status(200).json({ success: true, message: "Notification marked as read" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
};
