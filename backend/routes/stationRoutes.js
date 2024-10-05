import express from "express";
import {
  signupStation,
  updateStation,
  getStationById,
  getAllStations,
} from "../controllers/stationController.js";
import { protectRoute, authorizeRole } from "../middlewares/protectRoute.js";

const router = express.Router();

// Routes for fuel station management
router.post("/signup", protectRoute, authorizeRole, signupStation);  // Only station owners can sign up stations
router.put("/update/:station_regNumber", protectRoute, authorizeRole, updateStation); // Only station owners can update station details
router.get("/:id", protectRoute, getStationById);  // Authorized users can get station details by ID
router.get("/", protectRoute, getAllStations);  // Authorized users can get all station details

export default router;
