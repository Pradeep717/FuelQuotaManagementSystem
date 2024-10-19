import VehicleRegistry from "../models/vehicleRegistry.js";

// add a new vehicle to the registry from a set of vehicles
const addVehicleRegistry = async (req, res) => {
    try {
        // Required fields for validation
        const requiredFields = [
            "License_Plate",
            "Make",
            "Model",
            "Year",
            "Engine_Number",
            "Chassis_Number",
            "Fuel_Type",
            "Vehicle_Type",
            "Registration_Date",
            "Verified"
        ];

        // Filter out invalid vehicle records (those missing required fields)
        const validVehicles = req.body.filter(vehicle => 
            requiredFields.every(field => vehicle.hasOwnProperty(field))
        );

        if (validVehicles.length === 0) {
            return res.status(400).json({ message: "No valid vehicle data provided" });
        }

        // Insert only valid vehicles into the database
        const vehicleRegistry = await VehicleRegistry.insertMany(validVehicles);

        if (vehicleRegistry.length > 0) {
            res.status(201).json(vehicleRegistry);
        } else {
            res.status(400).json({ message: "No vehicles were registered" });
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in addVehicleRegistry: ", error.message);  
    }
};

export { addVehicleRegistry };
