const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
console.log("🔧 Starting server initialization...");
const app = express();
console.log("📦 Setting up middleware...");
app.use(cors());
app.use(express.json());

// Routes
console.log("🛣️  Setting up routes...");
const clientRoutes = require("./routing/clientRoutes");
const authRoutes = require("./routing/auth");

app.get("/", (req, res) => {
  res.send("api running");
});

app.use("/auth", authRoutes);
app.use("/clients", clientRoutes);

const PORT = process.env.PORT || 5000;
console.log(`⏳ Attempting to listen on port ${PORT}`);
app.listen(PORT, () => {
  console.log(`Server in apertura in ${PORT}`);
});
