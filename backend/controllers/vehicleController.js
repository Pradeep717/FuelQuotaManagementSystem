import Vehicle from "../models/vehicle.js";
import VehicleRegistry from "../models/vehicleRegistry.js";
import User from "../models/user.js";
import generateQrCode from "../utils/helpers/generateQrCode.js";
import FuelQuota from "../models/fuelQuota.js";
// Register a new
const registerVehicle = async (req, res) => {
  try {
    const { vehicleNumber } = req.body;
    const vehicleOwner = req.user._id;

    const role = await User.findById(vehicleOwner).select("role");

    if (role.role !== "vehicle_owner") {
      res.status(400).json({ message: "Unauthorized" });
      return;
    }

    const vehicle = await Vehicle.findOne({ vehicleNumber });
    if (vehicle) {
      res.status(400).json({ message: "Vehicle already exists" });
      return;
    }

    //verfiy vehicle from vehicle registry
    const vehicleRegistry = await VehicleRegistry.findOne({
      License_Plate: vehicleNumber,
    });
    if (!vehicleRegistry) {
      res
        .status(400)
        .json({ message: "Vehicle is not registered in the vehicle registry" });
      return;
    }

    const {
      Vehicle_Type: vehicleType,
      Fuel_Type: fuelType,
      Verified: isVerified,
    } = vehicleRegistry;

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

    // Create fuel quota for the vehicle based on type of vehicle , car 20, bike 10, truck 100, bus 100
    let allocatedQuota = 0;
    if (vehicleType === "car") {
      allocatedQuota = 20;
    } else if (vehicleType === "bike") {
      allocatedQuota = 10;
    } else if (vehicleType === "truck" || vehicleType === "bus") {
      allocatedQuota = 100;
    }

    const fuelQuota = new FuelQuota({
      vehicle: newVehicle._id,
      weekStartDate: new Date(),
      allocatedQuota,
      remainingQuota: allocatedQuota,
    });

    await fuelQuota.save();

    if (newVehicle && fuelQuota) {
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
    const vehicles = await Vehicle.find({})
      .select("-updatedAt -qrCode")
      .populate("vehicleOwner", "name");

    // Transform the response to include vehicleOwnerName
    const transformedVehicles = vehicles.map(vehicle => ({
      _id: vehicle._id,
      vehicleOwner: vehicle.vehicleOwner._id,
      vehicleOwnerName: vehicle.vehicleOwner.name,
      vehicleNumber: vehicle.vehicleNumber,
      vehicleType: vehicle.vehicleType,
      fuelType: vehicle.fuelType,
      isVerified: vehicle.isVerified,
      createdAt: vehicle.createdAt,
      __v: vehicle.__v
    }));

    res.status(200).json(transformedVehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getVehicles: ", error.message);
  }
};

// Get vehicle by id
const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).select("-updatedAt")
      .populate("vehicleOwner", "name");
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getVehicleById: ", error.message);
  }
};

// Delete vehicle by id
const deleteVehicle = async (req, res) => {
  try {
    const result = await Vehicle.findByIdAndDelete(req.params.id);
    if (!result) {
      res.status(404).json({ message: "Vehicle not found" });
      return;
    }
    res.status(200).json({ message: "Vehicle deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in deleteVehicle: ", error.message);
  }
};

const getAllVehiclesByUSerID = async (req, res) => {
  try {

    if(req.user.role !== "vehicle_owner") {
      res.status(400).json({ message: "Unauthorized" });
      return;
    }

    const vehicles = await Vehicle.find({ vehicleOwner: req.user._id });

    // Fetch the fuel quota details for each vehicle
    const vehicleDetails = await Promise.all(
      vehicles.map(async (vehicle) => {
        const fuelQuota = await FuelQuota.findOne({ vehicle: vehicle._id });
        return {
          _id: vehicle._id,
          vehicleNumber: vehicle.vehicleNumber,
          qrCode: vehicle.qrCode,
          vehicleType: vehicle.vehicleType,
          fuelType: vehicle.fuelType,
          isVerified: vehicle.isVerified,
          createdAt: vehicle.createdAt,
          remainingQuota: fuelQuota ? fuelQuota.remainingQuota : 0,
          allocatedQuota: fuelQuota ? fuelQuota.allocatedQuota : 0,
          usedQuota: fuelQuota ? fuelQuota.allocatedQuota - fuelQuota.remainingQuota : 0,
        };
      })
    );

    res.status(200).json(vehicleDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getAllVehiclesByUSerID: ", error.message);
  }
}

export { registerVehicle, getAllVehicles, getVehicleById, deleteVehicle, getAllVehiclesByUSerID };
