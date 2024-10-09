import FuelStation from "../models/fuelStation.js"; 
import User from "../models/user.js"; 
// import { protectRoute, authorizeRole } from "../middleware/protectRoute.js"; // Import protectRoute and authorizeRole middleware

// Signup a new fuel station
const signupStation = async (req, res) => {
  try {
    const { fuelStationOwner, stationName, location, station_regNumber } = req.body;

    // Check if user exists based on fuelStationOwner (the name)
    const user = await User.findOne({ name: fuelStationOwner });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Ensure the user has the role of station_owner
    if (user.role !== "station_owner") {
      return res.status(403).json({ message: "You are not authorized to sign up a fuel station" });
    }

    // Check if station already exists
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
    console.log("Error in signupStation: ", error.message);
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

export { signupStation, updateStation, getStationById, getAllStations };
