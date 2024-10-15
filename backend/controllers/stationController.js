import FuelStation from "../models/fuelStation.js"; 
import User from "../models/user.js"; 
import StationOperator from "../models/stationOperator.js";

// import { protectRoute, authorizeRole } from "../middleware/protectRoute.js"; // Import protectRoute and authorizeRole middleware

// Signup a new fuel station
const registerStation = async (req, res) => {
  try {
    const {stationName, location, station_regNumber } = req.body;

    const user = req.user;  // User retrieved from protectRoute middleware
    if (user.role !== "station_owner") {
        return res.status(403).json({ message: "You are not authorized to sign up a fuel station" });
    }

    const existingStation = await FuelStation.findOne({ station_regNumber });
    if (existingStation) {
        return res.status(400).json({ message: "Station already exists" });
    }
    
    // Create new station
    const newStation = new FuelStation({
      fuelStationOwner: user._id,  // Set fuelStationOwner to userId from found user
      stationName,
      location,
      station_regNumber,
    });

    await newStation.save();

    res.status(201).json({
      _id: newStation._id,
      stationName: newStation.stationName,
      stationOwner: newStation.fuelStationOwner,
      location: newStation.location,
      station_regNumber: newStation.station_regNumber,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in registerStation: ", error.message);
  }
};

// Update a station based on station_regNumber
const updateStation = async (req, res) => {
  try {
    const { stationName, location, station_regNumber } = req.body;
    const stationRegNumber = req.params.station_regNumber;  // Get station_regNumber from URL parameter

    // Find the station by its registration number
    let station = await FuelStation.findOne({ station_regNumber: stationRegNumber });
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    // Ensure the user is authorized and is the owner of the station
    const user = req.user;  // User retrieved from protectRoute middleware
    if (!station.fuelStationOwner.equals(user._id)) {
      return res.status(403).json({ message: "You are not authorized to update this station" });
    }

    // Update station details
    station.stationName = stationName || station.stationName;
    station.location = location || station.location;
    station.station_regNumber = station_regNumber || station.station_regNumber;

    // Save updated station
    station = await station.save();

    res.status(200).json({
      station: {
        _id: station._id,
        stationName: station.stationName,
        stationOwner: station.fuelStationOwner,
        location: station.location,
        station_regNumber: station.station_regNumber,
      },
      message: "Station updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in updateStation: ", error.message);
  }
};

// Get station details by ID
const getStationById = async (req, res) => {
  const stationId = req.params.id;

  try {
    const station = await FuelStation.findById(stationId);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getStationById: ", error.message);
  }
};

// Get all stations
const getAllStations = async (req, res) => {
  try {
    const stations = await FuelStation.find();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getAllStations: ", error.message);
  }
};

const addStationOperator = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = req.user;
    if (user.role !== "station_owner") {
      return res.status(403).json({ message: "You are not authorized to add a station operator" });
    }

    const station = await FuelStation.findOne({ fuelStationOwner: user._id });
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    const newStationOperator = new StationOperator({
        name,
        email,
        stationId: station._id,
        });

    await newStationOperator.save();

    res.status(201).json({
      _id: newStationOperator._id,
      name: newStationOperator.name,
      email: newStationOperator.email,
      stationId: newStationOperator.stationId,
    });
    }
    catch (error) {
      res.status(500).json({ message: error.message });
      console.log("Error in addStationOperator: ", error.message);
    }
}


export { registerStation, updateStation, getStationById, getAllStations, addStationOperator }; // Export the functions
