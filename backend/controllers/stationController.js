import FuelStation from "../models/fuelStation.js"; 
import User from "../models/user.js"; 
import { protectRoute, authorizeRole } from "../middleware/protectRoute.js"; // Import protectRoute and authorizeRole middleware

// Signup a new fuel station
const signupStation = async (req, res) => {
  try {
    // Ensure the user is authorized and has the role of station_owner
    const { role } = req;
    if (role !== "station_owner") {
      return res.status(403).json({ message: "You are not authorized to sign up a fuel station" });
    }

    const { userId, stationName, location, stationRegistrationNumber } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if station already exists
    const existingStation = await FuelStation.findOne({ stationRegistrationNumber });
    if (existingStation) {
      return res.status(400).json({ message: "Station already exists" });
    }

    // Create new station
    const newStation = new FuelStation({
      fuelStationOwner: user._id,  // Set fuelStationOwner to userId
      stationName,
      location,
      stationRegistrationNumber,
    });

    await newStation.save();

    res.status(201).json({
      _id: newStation._id,
      stationName: newStation.stationName,
      stationOwner: newStation.fuelStationOwner,
      location: newStation.location,
      stationRegistrationNumber: newStation.stationRegistrationNumber,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in signupStation: ", error.message);
  }
};

// Update a station
const updateStation = async (req, res) => {
  try {
    // Ensure the user is authorized and has the role of station_owner
    const { role } = req;
    if (role !== "station_owner") {
      return res.status(403).json({ message: "You are not authorized to update this station" });
    }

    const { stationName, location, stationRegistrationNumber } = req.body;
    const stationId = req.params.id;

    let station = await FuelStation.findById(stationId);
    if (!station) {
      return res.status(404).json({ message: "Station not found" });
    }

    // Update station details
    station.stationName = stationName || station.stationName;
    station.location = location || station.location;
    station.stationRegistrationNumber = stationRegistrationNumber || station.stationRegistrationNumber;
    station = await station.save();

    res.status(200).json({
      station: {
        _id: station._id,
        stationName: station.stationName,
        stationOwner: station.fuelStationOwner,
        location: station.location,
        stationRegistrationNumber: station.stationRegistrationNumber,
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

export { signupStation, updateStation, getStationById, getAllStations };
