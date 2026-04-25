const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express(); // ✅ FIRST create app

app.use(cors());
app.use(express.json());

// ✅ IMPORT ROUTES AFTER app is created
const authRoutes = require("./routes/auth");

// ✅ USE ROUTES AFTER import
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.log(err));