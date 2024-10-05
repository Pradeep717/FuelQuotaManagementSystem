import mongoose from "mongoose";

const fuelStationSchema = new mongoose.Schema(
  {
    fuelStationOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stationName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    registeredVehicles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
      },
    ],
    station_regNumber: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const FuelStation = mongoose.model("FuelStation", fuelStationSchema);

export default FuelStation;
