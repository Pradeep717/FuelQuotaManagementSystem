import express from "express";
import {
  registerFuelTransaction,
  checkFuelQuota,
} from "../controllers/fuelController.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/register", protectRoute, registerFuelTransaction);
router.post("/check-quota", protectRoute, checkFuelQuota);

export default router;
