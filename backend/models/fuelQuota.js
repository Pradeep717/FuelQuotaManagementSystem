import mongoose from "mongoose";

const fuelQuotaSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    weekStartDate: {
      type: Date,
      required: true,
    },
    allocatedQuota: {
      type: Number,
      required: true,
    },
    remainingQuota: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"], // Define valid enum values
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const FuelQuota = mongoose.model("FuelQuota", fuelQuotaSchema);

export default FuelQuota;
