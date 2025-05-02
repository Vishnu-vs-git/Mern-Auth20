import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoutes from "./routes/user-routes/user.route.js "
import authRoutes from "./routes/auth/auth.route.js"
import adminRoutes from"./routes/admin-routes/admin.route.js"
import cookieParser from 'cookie-parser';




mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(express.json()) 

app.listen(3000, () => {
  console.log("Server listening on port 3000 ");
});
app.use(cookieParser());

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use(express.json());

app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500;
  const message=err.message||"Internl Server Error";
  return res.status(statusCode).json({
    success:false,
    message,
    statusCode
  })
})
