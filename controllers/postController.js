import Prisma from "../config/prismaClient.js";

const createPost = async (req, res) => {
  const { title, description } = req.body;
  if ( !title || !description ) {
    res.status(404).json({ message: "All fields are mandatory" });
  }else {
    try {
      const post = await Prisma.post.create({
        data: {
          title: title,
          description: description,
        },
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

const getAllPosts = async (req, res) => {
  try {
    const posts = await Prisma.post.findMany();
    if (posts.length == 0) {
      res.status(404).json({ message: "Posts are empty! "});
    }else {
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const updatePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    const { title, description } = req.body;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    if (!title || !description) {
      return res.status(404).json({ message: "All fields are mandatory" });
    }

    const updatedPost = await Prisma.post.update({
      where: { id: postId },
      data: {
        title: title,
        description: description,
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: error.message });
  }
};


const getPost = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    if (!postId){
      res.status(404).json({ message: "Post Id are Mandatory! to find post " });
    }else {
      const post = await Prisma.post.findUnique({where: { id: postId }});
      if (post) {
        res.status(200).json(post);
      }else {
        res.status(404).json({ message: "Post not found!" });
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const deletePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    if (postId) {
      await Prisma.post.delete({ where: {id: postId} });
      res.status(204).json({ message: "Successfully deleted!" });
    }else {
      res.status(404).json({ message: "Post Id are Mandatory! to find post " });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export { createPost, getAllPosts, updatePost, getPost, deletePost };