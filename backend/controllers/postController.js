import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private/Editor/Admin
const createPost = asyncHandler(async (req, res) => {
  const { title, content, image } = req.body;

  const post = await Post.create({
    title,
    content,
    image,
    author: req.user._id,
  });

  if (post) {
    res.status(201).json(post);
  } else {
    res.status(400);
    throw new Error("Invalid post data");
  }
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ status: "published" })
    .populate("author", "name")
    .select("-content");

  res.json(posts);
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.body.id).populate("author", "name");

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc Update a post
// @route PUT /api/posts/:id
// @access Private/Editor/Admin
const updatePost = asyncHandler(async (req, res) => {
  const { title, content, image, status } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    post.title = title;
    post.content = content;
    post.image = image;
    post.status = status;

    const updatedPost = await post.save();

    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc Delete a post
// @route DELETE /api/posts/:id
// @access Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.remove();
    res.json({ message: "Post removed" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

const approvePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    post.status = "published";
    const approvedPost = await post.save();
    res.json(approvedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

export { createPost,approvePost, getPosts, getPostById, updatePost, deletePost };
