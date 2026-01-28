import express from "express";
import { authenticate, authorize } from "../../middleware/auth.js";

const router = express.Router();

// All routes require authentication and store_manager role
router.use(authenticate);
router.use(authorize("store_manager"));

// Get store reviews
router.get("/", async (req, res) => {
  // TODO: Implement get store reviews
  res.json({ success: true, message: "Get store reviews endpoint" });
});

// Get review statistics
router.get("/stats", async (req, res) => {
  // TODO: Implement get review stats
  res.json({ success: true, message: "Get review stats endpoint" });
});

// Respond to review
router.post("/:id/respond", async (req, res) => {
  // TODO: Implement respond to review
  res.json({ success: true, message: "Respond to review endpoint" });
});

export default router;
