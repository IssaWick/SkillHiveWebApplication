// controllers/profileController.js
import pool from "../config/userDb.js";
import { putObjectFromBuffer, deleteObjectByKey } from "../utils/s3.js";

// You already have this:
export const getProfile = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  let conn;
  try {
    conn = await pool.getConnection();
    const [rows] = await conn.execute(
      `SELECT id, name, email, nic, contact, age, district, city, profilePicture, profilePictureKey, ratings, userType
       FROM \`user\`
       WHERE id = ?`,
      [userId]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("getProfile error:", err);
    return res.status(500).json({ error: "Failed to retrieve user info" });
  } finally {
    if (conn) conn.release();
  }
};

// NEW: PUT /updateProfile
export const updateProfile = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const { name, contact, district, city, age, email, nic, removePic } = req.body;
  const wantsRemove =
    String(removePic).toLowerCase() === "true" || removePic === "1";

  let conn;
  try {
    conn = await pool.getConnection();

    // Fetch existing for old key/url
    const [existingRows] = await conn.execute(
      `SELECT profilePicture, profilePictureKey FROM \`user\` WHERE id = ?`,
      [userId]
    );
    if (existingRows.length === 0)
      return res.status(404).json({ error: "User not found" });

    const oldKey = existingRows[0].profilePictureKey;

    // Build dynamic update parts
    const fields = [];
    const params = [];

    if (typeof name === "string") {
      fields.push("name = ?");
      params.push(name);
    }
    if (typeof contact === "string") {
      fields.push("contact = ?");
      params.push(contact);
    }
    if (typeof district === "string") {
      fields.push("district = ?");
      params.push(district);
    }
    if (typeof city === "string") {
      fields.push("city = ?");
      params.push(city);
    }
    if (typeof age !== "undefined" && age !== null && age !== "") {
      fields.push("age = ?");
      params.push(Number(age));
    }
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (typeof email === "string") {
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
      fields.push("email = ?");
      params.push(email);
    }
    if (typeof nic === "string") {
      fields.push("nic = ?");
      params.push(nic);
    }


    let uploadedKey = null;
    let uploadedUrl = null;

    // A) New image uploaded -> upload first, set new fields
    if (req.file && req.file.buffer) {
      const { key, url } = await putObjectFromBuffer({
        buffer: req.file.buffer,
        contentType: req.file.mimetype,
        keyPrefix: "profiles",
        userId,
      });
      uploadedKey = key;
      uploadedUrl = url;

      fields.push("profilePicture = ?");
      params.push(uploadedUrl);
      fields.push("profilePictureKey = ?");
      params.push(uploadedKey);
    }
    // B) Remove current image -> clear fields (if no new image uploaded)
    else if (wantsRemove) {
      fields.push("profilePicture = ?");
      params.push(null);
      fields.push("profilePictureKey = ?");
      params.push(null);
    }

    // Nothing to update?
    if (fields.length === 0) {
      // Return current state
      const [rows] = await conn.execute(
        `SELECT id, name, email, nic, contact, age, district, city, profilePicture, profilePictureKey, ratings, userType
         FROM \`user\`
         WHERE id = ?`,
        [userId]
      );
      return res.status(200).json(rows[0]);
    }

    const sql = `UPDATE \`user\` SET ${fields.join(", ")} WHERE id = ?`;
    params.push(userId);
    await conn.execute(sql, params);

    // Cleanup old S3 object AFTER successful update:
    try {
      if (uploadedKey && oldKey && oldKey !== uploadedKey) {
        await deleteObjectByKey(oldKey);
      } else if (wantsRemove && oldKey && !uploadedKey) {
        await deleteObjectByKey(oldKey);
      }
    } catch (e) {
      // non-fatal
      console.warn("S3 cleanup warning:", e?.message || e);
    }

    // Return fresh row
    const [rows] = await conn.execute(
      `SELECT id, name, email, nic, contact, age, district, city, profilePicture, profilePictureKey, ratings, userType
       FROM \`user\`
       WHERE id = ?`,
      [userId]
    );
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("updateProfile error:", err);
    return res.status(500).json({ error: "Failed to update profile" });
  } finally {
    if (conn) conn.release();
  }
};
