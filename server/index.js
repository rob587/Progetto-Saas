const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

console.log("🔧 Starting server initialization...");

const app = express();

console.log("📦 Setting up middleware...");
app.use(cors());
app.use(express.json());

console.log("🛣️  Setting up routes...");

try {
  const clientRoutes = require("./routing/clientRoutes");
  console.log("✅ Client routes loaded");
  app.use("/clients", clientRoutes);
} catch (err) {
  console.error("❌ Error loading client routes:", err.message);
}

try {
  const authRoutes = require("./routing/auth");
  console.log("✅ Auth routes loaded");
  app.use("/auth", authRoutes);
} catch (err) {
  console.error("❌ Error loading auth routes:", err.message);
}

app.get("/", (req, res) => {
  res.send("api running");
});

const PORT = process.env.PORT || 5000;
console.log(`⏳ Attempting to listen on port ${PORT}`);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on 0.0.0.0:${PORT}`);
});
