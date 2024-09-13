import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import userRoutes from './routes/userRoutes.js';
// import vehicleRoutes from './routes/vehicleRoutes.js';
import cookieParser from 'cookie-parser';
 
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/', (req, res) => res.send('API is running...'));
// app.use('/api/vehicles', vehicleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(500, () => console.log(`Server is running on port ${PORT}`));
