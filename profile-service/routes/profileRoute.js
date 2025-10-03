// routes/profileRoutes.js
import express from "express";
import {
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUserById,
  addService,
  getProviderAcceptedServices,
  getAllServices,
  updateServiceStatus,
  deleteServiceById,
} from "../controllers/profileController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { upload } from "../utils/s3.js";

const router = express.Router();

// Read
router.get("/getProfile", verifyToken, getProfile);
router.get("/me", verifyToken, getProfile);

// Update profile
router.put(
  "/updateProfile",
  verifyToken,
  upload.single("profilePic"),
  updateProfile
);

// Admin functions
router.get("/allUsers", verifyToken, getAllUsers);
router.delete("/deleteUser/:id", verifyToken, deleteUserById);

// Add new service (with certificate file upload: "certificate")
router.post(
  "/addService",
  verifyToken,
  upload.single("certificate"),
  addService
);

// Service provider’s own accepted services
router.get("/myAcceptedServices", verifyToken, getProviderAcceptedServices);

// All services (admin or general usage)
router.get("/allServices", verifyToken, getAllServices);

// Admin: update service status
router.put("/updateServiceStatus/:id", verifyToken, updateServiceStatus);

// Delete service (allowed for Admin or service owner)
router.delete("/deleteService/:id", verifyToken, deleteServiceById);

export default router;
