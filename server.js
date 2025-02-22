import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';

dotenv.config();

const app = express();
app.use(express.json()); 


mongoose.connect(process.env.MONGO_URI, {

}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

import productRoutes from './routes/productRoutes.js';
app.use('/api/products', productRoutes);

app.use("/api/user" , userRouter)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

