const express = require("express");
const multer = require("multer");
const path = require("path");
const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) {
      cb(null, true);
      return;
    }

    cb(new Error("Only image files are allowed"));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  "/",
  auth,
  upload.single("image"),
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      const product = new Product({
        name: req.body.name,
        price: Number(req.body.price),
        image: `/uploads/${req.file.filename}`,
      });

      await product.save();
      return res.status(201).json(product);
    } catch (error) {
      return next(error);
    }
  },
);

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json(products);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
