const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

// Middleware
app.use(cors()); // 👈 important
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
