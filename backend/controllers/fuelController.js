import FuelTransaction from "../models/fuelTransaction.js";
import FuelQuota from "../models/fuelQuota.js";
import Vehicle from "../models/vehicle.js";
import FuelStation from "../models/fuelStation.js";
import mongoose from "mongoose";

// Register a new fuel transaction
const registerFuelTransaction = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { qrCode, fuelStationId, fuelType, litresPumped } = req.body;

    // Find the vehicle by QR code
    const vehicle = await Vehicle.findOne({ qrCode }).session(session);
    if (!vehicle) {
      res.status(400).json({ message: "Vehicle not found" });
      return;
    }

    // Find the fuel quota for the vehicle
    const fuelQuota = await FuelQuota.findOne({ vehicle: vehicle._id }).session(session);
    if (!fuelQuota) {
      res.status(400).json({ message: "Fuel Quota not found" });
      return;
    }

    // Check if the remaining quota is sufficient
    if (fuelQuota.remainingQuota < litresPumped) {
      res.status(400).json({ message: "Insufficient Quota" });
      return;
    }

    // Find the fuel station
    const fuelStation = await FuelStation.findById(fuelStationId).session(session);
    if (!fuelStation) {
      res.status(400).json({ message: "Fuel Station not found" });
      return;
    }

    const quotaBefore = fuelQuota.remainingQuota;
    const quotaAfter = fuelQuota.remainingQuota - litresPumped;

    // Create a new fuel transaction
    const newFuelTransaction = new FuelTransaction({
      vehicle: vehicle._id,
      fuelStation: fuelStation._id,
      fuelType,
      litresPumped,
      quotaBefore,
      quotaAfter,
    });

    await newFuelTransaction.save({ session });

    // Update the remaining quota
    fuelQuota.remainingQuota = quotaAfter;
    await fuelQuota.save({ session });

    // Add the vehicle to the registeredVehicles array in the fuel station
    fuelStation.registeredVehicles.push({
      vehicle: vehicle._id,
      date: new Date(),
    });
    await fuelStation.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      _id: newFuelTransaction._id,
      vehicle: newFuelTransaction.vehicle,
      fuelStation: newFuelTransaction.fuelStation,
      fuelType: newFuelTransaction.fuelType,
      litresPumped: newFuelTransaction.litresPumped,
      quotaBefore: newFuelTransaction.quotaBefore,
      quotaAfter: newFuelTransaction.quotaAfter,
      status: newFuelTransaction.status,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

// Check fuel quota for a vehicle using qrCode
const checkFuelTransaction = async (req, res) => {
  try {
    const { qrCode } = req.body;

    const vehicle = await Vehicle.findOne({ qrCode });
    if (!vehicle) {
      res.status(400).json({ message: "Vehicle not found" });
      return;
    }

    const fuelQuota = await FuelQuota.findOne({ vehicle: vehicle._id });
    if (!fuelQuota) {
      res.status(400).json({ message: "Fuel Quota not found" });
      return;
    }

    //check if the vehicle has enough quota to pump fuel 
    if (fuelQuota.remainingQuota > 0) {
      res.status(200).json({
        vehicle: vehicle._id,
        remainingQuota: fuelQuota.remainingQuota,
      });
    } else {
      res.status(400).json({ message: "Insufficient Quota" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in checkFuelQuota: ", error.message);
  } 
};

export default {registerFuelTransaction, checkFuelTransaction};