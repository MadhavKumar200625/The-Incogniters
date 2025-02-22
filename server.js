import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import productRoutes from './routes/productRoutes.js';
import homePageRoutes from './routes/homepageRoutes.js'; 
import singleProductRoutes from './routes/singleProductRoutes.js';
import userProductsRoutes from "./routes/userProductsRoutes.js"; 
import barterRoutes from "./routes/barterRoute.js";
import searchRoutes from "./routes/searchRoutes.js";



dotenv.config();


const app = express();
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

app.use('/api/products', productRoutes);
app.use("/api/user", userRouter);
app.use("/api/homepage", homePageRoutes); 
app.use("/api/products", singleProductRoutes);
app.use("/api/user", userProductsRoutes); 
app.use("/api/barter", barterRoutes);
app.use("/api/products", searchRoutes);
app.use("/",(req,res)=>{
    res.json({"hello":"world"})
    })
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));