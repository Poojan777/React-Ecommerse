const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/uploads", express.static(uploadsDir));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.post("/api/payment", (req, res) => {
  const amount = Number(req.body?.amount);

  if (Number.isFinite(amount) && amount > 0) {
    return res.json({ status: "success" });
  }

  return res.status(400).json({ status: "failed" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "MulterError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.message === "Only image files are allowed") {
    return res.status(400).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
});

const startServer = async () => {
  if (!MONGO_URI) {
    console.error("MONGO_URI is not set in .env");
    process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not set in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();
