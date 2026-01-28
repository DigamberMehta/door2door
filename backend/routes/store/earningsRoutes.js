import express from "express";
import { authenticate, authorize } from "../../middleware/auth.js";

const router = express.Router();

// All routes require authentication and store_manager role
router.use(authenticate);
router.use(authorize("store_manager"));

// Get earnings summary
router.get("/", async (req, res) => {
  // TODO: Implement get earnings
  res.json({ success: true, message: "Get earnings endpoint" });
});

// Get transaction history
router.get("/transactions", async (req, res) => {
  // TODO: Implement get transactions
  res.json({ success: true, message: "Get transactions endpoint" });
});

// Get payout history
router.get("/payouts", async (req, res) => {
  // TODO: Implement get payouts
  res.json({ success: true, message: "Get payouts endpoint" });
});

// Update bank account details
router.put("/bank-account", async (req, res) => {
  // TODO: Implement update bank account
  res.json({ success: true, message: "Update bank account endpoint" });
});

export default router;
