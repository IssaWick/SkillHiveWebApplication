// routes/profileRoutes.js
import express from "express";
import { getProfile, updateProfile, getAllUsers, deleteUserById } from "../controllers/profileController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { upload } from "../utils/s3.js";

const router = express.Router();

// Read
router.get("/getProfile", verifyToken, getProfile);
router.get("/me", verifyToken, getProfile); // optional alias

// Update (multipart/form-data; image field name = "profilePic")
router.put(
  "/updateProfile",
  verifyToken,
  upload.single("profilePic"),
  updateProfile
);

router.get("/allUsers", verifyToken, getAllUsers);
router.delete("/deleteUser/:id", verifyToken, deleteUserById);


export default router;
