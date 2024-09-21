import Vehicle from "../models/vehicle.js";
import User from "../models/user.js";
import generateQrCode from "../utils/helpers/generateQrCode.js";

// Register a new
const registerVehicle = async (req, res) => {
  try {
    const { vehicleNumber, vehicleType, fuelType } = req.body;
    const vehicleOwner = req.user._id;

    const vehicle = await Vehicle.findOne({ vehicleNumber });
    if (vehicle) {
      res.status(400).json({ message: "Vehicle already exists" });
      return;
    }

    //isVerified: set true unil logic is implemented later 
    const isVerified = true;

    const qrCOdeDate = `${vehicleNumber}-${vehicleType}-${fuelType}`;
    const qrCode = await generateQrCode(qrCOdeDate);

    const newVehicle = new Vehicle({
      vehicleOwner,
      vehicleNumber,
      vehicleType,
      fuelType,
      qrCode,
      isVerified,
    });

    await newVehicle.save();

    if (newVehicle) {
      res.status(201).json({
        _id: newVehicle._id,
        vehicleOwner: newVehicle.vehicleOwner,
        vehicleNumber: newVehicle.vehicleNumber,
        vehicleType: newVehicle.vehicleType,
        fuelType: newVehicle.fuelType,
        qrCode: newVehicle.qrCode,
        isVerified: newVehicle.isVerified,
      });
    } else {
      res.status(400).json({ message: "Invalid vehicle data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in registerVehicle: ", error.message);
  }
};

// Get all vehicles
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({}).select("-updatedAt").select("-qrCode");
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getVehicles: ", error.message);
  }
};

// Get vehicle by id
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).select("-updatedAt");
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getVehicleById: ", error.message);
  }
};

export { registerVehicle, getAllVehicles, getVehicleById };
