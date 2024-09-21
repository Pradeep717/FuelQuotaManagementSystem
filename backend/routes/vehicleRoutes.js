import express from "express";
import {
  getAllVehicles,
  getVehicleById,
  registerVehicle,
} from "../controllers/vehicleController.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();
router.get("/", protectRoute, getAllVehicles);
router.get("/:id", protectRoute, getVehicleById);
router.post("/register", protectRoute, registerVehicle);

export default router;
