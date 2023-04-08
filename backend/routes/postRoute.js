import express from "express";
import asyncHandler from "express-async-handler";
import {
  protect,
  isAdmin,
  isEditorOrAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  approvePost,
} from "../controllers/postController.js";

const router = express.Router();

router.route("/").post(protect, isEditorOrAdmin, createPost).get(getPosts);
router
  .route("/:id")
  .get(getPostById)
  .put(protect, isEditorOrAdmin, updatePost)
  .delete(protect, isAdmin, deletePost);
router.route("/:id/approve").put(protect, isAdmin, approvePost);

export default router;
