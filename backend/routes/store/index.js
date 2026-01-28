import express from "express";
import { authenticate, authorize } from "../../middleware/auth.js";
import storeProductRoutes from "./productRoutes.js";
import storeStoreRoutes from "./storeRoutes.js";
import storeOrderRoutes from "./orderRoutes.js";
import storeReviewRoutes from "./reviewRoutes.js";
import storeEarningsRoutes from "./earningsRoutes.js";

const router = express.Router();

// All routes require authentication and store_manager role
router.use(authenticate);
router.use(authorize("store_manager"));

// Mount sub-routes
router.use("/products", storeProductRoutes);
router.use("/store", storeStoreRoutes);
router.use("/orders", storeOrderRoutes);
router.use("/reviews", storeReviewRoutes);
router.use("/earnings", storeEarningsRoutes);

export default router;
