import express from "express";
import { authenticate, authorize } from "../../middleware/auth.js";

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use(authorize("admin"));

// Get all categories
router.get("/", async (req, res) => {
  // TODO: Implement get all categories
  res.json({ success: true, message: "Get all categories endpoint" });
});

// Get category by ID
router.get("/:id", async (req, res) => {
  // TODO: Implement get category by ID
  res.json({ success: true, message: "Get category by ID endpoint" });
});

// Create category
router.post("/", async (req, res) => {
  // TODO: Implement create category
  res.json({ success: true, message: "Create category endpoint" });
});

// Update category
router.put("/:id", async (req, res) => {
  // TODO: Implement update category
  res.json({ success: true, message: "Update category endpoint" });
});

// Delete category
router.delete("/:id", async (req, res) => {
  // TODO: Implement delete category
  res.json({ success: true, message: "Delete category endpoint" });
});

export default router;
