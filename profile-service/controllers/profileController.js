// controllers/profileController.js
import pool from "../config/userDb.js";
import servicePool from "../config/servicesDb.js";
import { putObjectFromBuffer, deleteObjectByKey } from "../utils/s3.js";

// GET /profile
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

// PUT /updateProfile
export const updateProfile = async (req, res) => {
  // Allow admin to edit any user by ID, else default to own profile
  let targetUserId = req.body.id || req.user?.id;
  if (!targetUserId) return res.status(401).json({ error: "Unauthorized" });

  // Non-admins cannot update other users
  if (req.body.id && req.user?.userType !== "Admin") {
    return res.status(403).json({ error: "Forbidden - Admins only" });
  }

  const { name, contact, district, city, age, email, nic, removePic } = req.body;
  const wantsRemove =
    String(removePic).toLowerCase() === "true" || removePic === "1";

  let conn;
  try {
    conn = await pool.getConnection();

    // Ensure NIC/email/contact uniqueness
    if (email) {
      const [dupes] = await conn.execute(
        `SELECT id FROM \`user\` WHERE email = ? AND id <> ?`,
        [email, targetUserId]
      );
      if (dupes.length > 0)
        return res.status(400).json({ error: "Email already in use" });
    }
    if (nic) {
      const [dupes] = await conn.execute(
        `SELECT id FROM \`user\` WHERE nic = ? AND id <> ?`,
        [nic, targetUserId]
      );
      if (dupes.length > 0)
        return res.status(400).json({ error: "NIC already in use" });
    }
    if (contact) {
      const [dupes] = await conn.execute(
        `SELECT id FROM \`user\` WHERE contact = ? AND id <> ?`,
        [contact, targetUserId]
      );
      if (dupes.length > 0)
        return res.status(400).json({ error: "Contact already in use" });
    }

    // Fetch existing for old key/url
    const [existingRows] = await conn.execute(
      `SELECT profilePicture, profilePictureKey FROM \`user\` WHERE id = ?`,
      [targetUserId]
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

    // A) New image uploaded
    if (req.file && req.file.buffer) {
      const { key, url } = await putObjectFromBuffer({
        buffer: req.file.buffer,
        contentType: req.file.mimetype,
        keyPrefix: "profiles",
        userId: targetUserId,
      });
      uploadedKey = key;
      uploadedUrl = url;

      fields.push("profilePicture = ?");
      params.push(uploadedUrl);
      fields.push("profilePictureKey = ?");
      params.push(uploadedKey);
    }
    // B) Remove current image
    else if (wantsRemove) {
      fields.push("profilePicture = ?");
      params.push(null);
      fields.push("profilePictureKey = ?");
      params.push(null);
    }

    // Nothing to update?
    if (fields.length === 0) {
      const [rows] = await conn.execute(
        `SELECT id, name, email, nic, contact, age, district, city, profilePicture, profilePictureKey, ratings, userType
         FROM \`user\`
         WHERE id = ?`,
        [targetUserId]
      );
      return res.status(200).json(rows[0]);
    }

    const sql = `UPDATE \`user\` SET ${fields.join(", ")} WHERE id = ?`;
    params.push(targetUserId);
    await conn.execute(sql, params);

    // Cleanup old S3 object AFTER successful update:
    try {
      if (uploadedKey && oldKey && oldKey !== uploadedKey) {
        await deleteObjectByKey(oldKey);
      } else if (wantsRemove && oldKey && !uploadedKey) {
        await deleteObjectByKey(oldKey);
      }
    } catch (e) {
      console.warn("S3 cleanup warning:", e?.message || e);
    }

    // Return fresh row
    const [rows] = await conn.execute(
      `SELECT id, name, email, nic, contact, age, district, city, profilePicture, profilePictureKey, ratings, userType
       FROM \`user\`
       WHERE id = ?`,
      [targetUserId]
    );
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("updateProfile error:", err);
    return res.status(500).json({ error: "Failed to update profile" });
  } finally {
    if (conn) conn.release();
  }
};

// GET /allUsers
export const getAllUsers = async (req, res) => {
  if (!req.user || req.user.userType !== "Admin") {
    return res.status(403).json({ error: "Forbidden - Admins only" });
  }

  try {
    const conn = await pool.getConnection();
    const [customers] = await conn.query(
      "SELECT * FROM user WHERE userType = 'Customer'"
    );
    const [serviceProviders] = await conn.query(
      "SELECT * FROM user WHERE userType = 'Service Provider'"
    );
    conn.release();

    res.json({ customers, serviceProviders });
  } catch (err) {
    console.error("getAllUsers error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// DELETE /deleteUser/:id
export const deleteUserById = async (req, res) => {
  if (!req.user || req.user.userType !== "Admin") {
    return res.status(403).json({ error: "Forbidden - Admins only" });
  }

  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "User ID required" });

  let conn;
  try {
    conn = await pool.getConnection();

    // Get user first
    const [rows] = await conn.execute(
      `SELECT profilePictureKey FROM \`user\` WHERE id = ?`,
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "User not found" });

    const profilePictureKey = rows[0].profilePictureKey;

    // Delete user
    await conn.execute(`DELETE FROM \`user\` WHERE id = ?`, [id]);

    // Delete S3 object if exists
    if (profilePictureKey) {
      try {
        await deleteObjectByKey(profilePictureKey);
      } catch (err) {
        console.warn("S3 delete warning:", err?.message || err);
      }
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("deleteUserById error:", err);
    return res.status(500).json({ error: "Failed to delete user" });
  } finally {
    if (conn) conn.release();
  }
};

// POST /addService
export const addService = async (req, res) => {
  const providerId = req.user?.id;
  if (!providerId) return res.status(401).json({ error: "Unauthorized" });

  const { service_name, service_type, description, city, district } = req.body;

  if (!service_name || !service_type || !description || !city || !district) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let uploadedKey = null;
  let uploadedUrl = null;

  try {
    // If certificate file uploaded
    if (req.file && req.file.buffer) {
      const { key, url } = await putObjectFromBuffer({
        buffer: req.file.buffer,
        contentType: req.file.mimetype,
        keyPrefix: "certificates",
        userId: providerId,
      });
      uploadedKey = key;
      uploadedUrl = url;
    }

    const conn = await servicePool.getConnection();
    const sql = `
      INSERT INTO services 
      (service_name, service_type, description, provider_id, city, district, certificate, certificateKey, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
    `;
    const params = [
      service_name,
      service_type,
      description,
      providerId,
      city,
      district,
      uploadedUrl,
      uploadedKey,
    ];

    const [result] = await conn.execute(sql, params);
    conn.release();

    return res.status(201).json({
      message: "Service added successfully",
      serviceId: result.insertId,
      certificate: uploadedUrl,
      status: "pending",
    });
  } catch (err) {
    console.error("addService error:", err);
    return res.status(500).json({ error: "Failed to add service" });
  }
};

// GET /myAcceptedServices
export const getProviderAcceptedServices = async (req, res) => {
  const providerId = req.user?.id;
  if (!providerId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const conn = await servicePool.getConnection();
    const [rows] = await conn.execute(
      `SELECT * FROM services WHERE provider_id = ? AND status = 'Accept'`,
      [providerId]
    );
    conn.release();

    return res.status(200).json(rows);
  } catch (err) {
    console.error("getProviderAcceptedServices error:", err);
    return res.status(500).json({ error: "Failed to fetch services" });
  }
};

// GET /allServices
export const getAllServices = async (req, res) => {
  try {
    const conn = await servicePool.getConnection();
    const [rows] = await conn.execute(`SELECT * FROM services`);
    conn.release();

    return res.status(200).json(rows);
  } catch (err) {
    console.error("getAllServices error:", err);
    return res.status(500).json({ error: "Failed to fetch all services" });
  }
};

// PUT /updateServiceStatus/:id
export const updateServiceStatus = async (req, res) => {
  if (!req.user || req.user.userType !== "Admin") {
    return res.status(403).json({ error: "Forbidden - Admins only" });
  }

  const { id } = req.params;
  const { status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: "Service ID and status required" });
  }
  if (!["Accept", "Declined"].includes(status)) {
    return res.status(400).json({ error: "Status must be Accept or Declined" });
  }

  try {
    const conn = await servicePool.getConnection();
    const [result] = await conn.execute(
      `UPDATE services SET status = ? WHERE service_id = ?`,
      [status, id]
    );
    conn.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    return res.status(200).json({ message: "Service status updated", status });
  } catch (err) {
    console.error("updateServiceStatus error:", err);
    return res.status(500).json({ error: "Failed to update status" });
  }
};

export const deleteServiceById = async (req, res) => {
  const { id } = req.params; // service_id
  if (!id) return res.status(400).json({ error: "Service ID required" });

  let conn;
  try {
    conn = await servicePool.getConnection();

    // Fetch service first
    const [rows] = await conn.execute(
      `SELECT provider_id, certificateKey FROM services WHERE service_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Service not found" });
    }

    const service = rows[0];

    // Check permission: only Admin or service owner can delete
    if (req.user?.userType !== "Admin" && req.user?.id !== service.provider_id) {
      return res.status(403).json({ error: "Forbidden - Not allowed to delete this service" });
    }

    // Delete service
    await conn.execute(`DELETE FROM services WHERE service_id = ?`, [id]);

    // Cleanup S3 certificate if exists
    if (service.certificateKey) {
      try {
        await deleteObjectByKey(service.certificateKey);
      } catch (err) {
        console.warn("S3 certificate delete warning:", err?.message || err);
      }
    }

    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error("deleteServiceById error:", err);
    return res.status(500).json({ error: "Failed to delete service" });
  } finally {
    if (conn) conn.release();
  }
};