import express from "express";
import asyncHandler from "express-async-handler";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  // updateUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/").post(registerUser).get(protect, isAdmin, getUsers);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUserProfile);

export default router;
