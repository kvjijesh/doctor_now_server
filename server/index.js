import express from 'express'
const app=express()
import dotenv from "dotenv"
import { connect } from './config/dbConnect.js'
dotenv.config()
connect()
import authRoute from "./routes/auth.js"
import userRoute from './routes/users.js';
import doctorRoute from "./routes/doctors.js";
import adminRoute from "./routes/admin.js"
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";

//middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use("/images", express.static("images"));
app.use(cookieParser())
app.use("/",userRoute)
app.use("/auth",authRoute)
app.use("/doctor",doctorRoute)
app.use("/admin",adminRoute)
//error handler
app.use((err,req,res,next)=>{
    const errorStatus=err.status||500;
    const errorMessage=err.message || "something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

const PORT=process.env.PORT||4000
app.listen(PORT,()=>{
  console.log(`listening on port ` +PORT)
})