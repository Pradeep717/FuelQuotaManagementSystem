import express from "express";
import {
  registerStation,
  updateStation,
  getStationById,
  getAllStations,
  addStationOperator,
  deleteStationOperator,
  deleteStation,
  getAllStationOperators,
} from "../controllers/stationController.js";
import { protectRoute, authorizeRole, authorizeAdmin } from "../middlewares/protectRoute.js";

const router = express.Router();

// Routes for fuel station management
router.post("/registerStation", protectRoute, authorizeRole, registerStation);  // Only station owners can sign up stations
router.put("/update/:station_regNumber", protectRoute, authorizeRole, updateStation); // Only station owners can update station details
router.post("/addStationOperator", protectRoute, addStationOperator);
router.get("/getAllStationOperators", protectRoute, getAllStationOperators);
router.delete("/deleteStationOperator/:id", protectRoute, deleteStationOperator);
router.delete("/deleteStation/:id", protectRoute, authorizeAdmin, deleteStation);  // Authorized users can delete station details
router.get("/:id", protectRoute, getStationById);  // Authorized users can get station details by ID
router.get("/", protectRoute, getAllStations);  // Authorized users can get all station details


export default router;
