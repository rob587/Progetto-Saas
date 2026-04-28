const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Routes

const clientRoutes = require("./routing/clientRoutes");

app.get("/", (req, res) => {
  res.send("api running");
});

app.use("/clients", clientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server in apertura in ${PORT}`);
});
