import express from "express";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.post('/posts/create', createPost);
postRouter.get("/posts", getAllPosts);
postRouter.put("/posts/edit/:postId", updatePost);
postRouter.get("/posts/:postId", getPost);
postRouter.delete("/posts/:postId", deletePost);

export default postRouter;
