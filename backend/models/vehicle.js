import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicleOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleType: {
      type: String,
      enum: ["car", "bike", "truck", "bus"],
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["petrol", "diesel"],
      required: true,
    },
    qrCode: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
