import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import fuelTransactionRoutes from "./routes/fuelTransactionRoutes.js";
import stationRoutes from "./routes/stationRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import cron from "node-cron";
import FuelQuota from "./models/fuelQuota.js";

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/fuel", fuelTransactionRoutes);
app.use("/api/stations", stationRoutes); // Ensure stations route is registered under "/api/stations"
app.use("/", (req, res) => res.send("API is running..."));
// app.use('/api/vehicles', vehicleRoutes);

// // CRON job to reset remaining quota at midnight every Sunday
// cron.schedule("0 0 * * 1", async () => {
//   try {
//     // Find all fuel quotas
//     const fuelQuotas = await FuelQuota.find({});

//     // Update each quota
//     for (let quota of fuelQuotas) {
//       quota.remainingQuota = quota.allocatedQuota;
//       await quota.save();
//     }

//     console.log("Fuel quotas reset to allocatedQuota successfully");
//   } catch (error) {
//     console.error("Error in resetting fuel quotas: ", error.message);
//   }
// });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
