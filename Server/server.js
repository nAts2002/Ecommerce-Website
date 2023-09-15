import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/MongoDb.js';
import productRoute from './Routes/ProductRoutes.js';
import userRoute from './Routes/UserRoute.js';
import orderRoutes from './Routes/OrderRoutes.js';
import { errorHandler, notFound } from './Middleware/Errors.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

//API Routes
app.use("/api/products", productRoute); 
app.use("/api/users", userRoute); 
app.use('/api/orders', orderRoutes)

//Error Handler
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Server running on port ${PORT}`));