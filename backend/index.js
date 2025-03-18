import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB } from './configs/db.js';

import authRoute from './routes/authRoute.js';

dotenv.config();
connectDB()

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoute)

app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`);
});