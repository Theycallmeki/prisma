const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Create Post
router.post("/", async (req, res) => {
  const { title, authorId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        author: {
          connect: { id: Number(authorId) }, // ✅ link to User
        },
      },
      include: { author: true }, // ✅ return author for frontend
    });
    res.json(post);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(400).json({ error: err.message });
  }
});

// Get all Posts
router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
    });
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Publish Post
router.put("/:id/publish", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { published: true },
      include: { author: true }, // return author too
    });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.json({ message: `Post ${id} deleted successfully` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
