import express from "express";
import {
  getAllVehicles,
  getVehicleById,
  registerVehicle,
  deleteVehicle,
  getAllVehiclesByUSerID
} from "../controllers/vehicleController.js";
import { addVehicleRegistry } from "../controllers/vehicleRegistryController.js";
import { protectRoute, authorizeAdmin } from "../middlewares/protectRoute.js";

const router = express.Router();
router.get("/", protectRoute, getAllVehicles);
router.get("/:id", protectRoute, getVehicleById);
router.get("/user/:id", protectRoute, getAllVehiclesByUSerID);
router.post("/register", protectRoute, registerVehicle);
router.post("/registry", protectRoute, authorizeAdmin, addVehicleRegistry);
router.delete("/:id", protectRoute, deleteVehicle);


export default router;
