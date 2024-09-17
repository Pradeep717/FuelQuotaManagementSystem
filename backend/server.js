import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/', (req, res) => res.send('API is running...'));
// app.use('/api/vehicles', vehicleRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
