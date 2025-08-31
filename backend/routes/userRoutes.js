const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Create User
router.post("/", async (req, res) => {
  const { email, name, role } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email, name, role },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Users
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({ include: { posts: true } });
  res.json(users);
});

// Delete User
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json({ message: `User ${id} deleted successfully` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
