import mongoose from "mongoose";

const stationOperatorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["station_operator"],
            default: "station_operator",
        },
        stationId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FuelStation",
            required: true,
        }, 
    },
    {
        timestamps: true,
    }
);

const StationOperator = mongoose.model("StationOperator", stationOperatorSchema);

export default StationOperator;