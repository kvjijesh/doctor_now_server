import Doctor from "../models/doctorModel.js"
import { createError } from "../utils/error.js"
import User from '../models/userModel.js'
//get all doctors

export const getAllDoctors=async (req,res,next)=>{

    try {

        const allDoctors=await Doctor.find()
        res.status(200).json(allDoctors)

    } catch (error) {
        next(error)
    }

}

export const blockDoctor=async (req,res,next)=>{
    const {doctorId}=req.params;
    const {blockedStatus}=req.body;
    console.log(doctorId,blockedStatus);

    try {
        const doctor= await Doctor.findByIdAndUpdate(doctorId,{is_blocked:blockedStatus},{new:true});
        if(!doctor) return next(createError(404, "Doctor not found"));
        return res.status(200).json({doctor})
    } catch (error) {
        next(error)
    }
}
export const blockUser=async (req,res,next)=>{
    const {userId}=req.params;
    const {blockedStatus}=req.body;
    console.log(userId,blockedStatus);

    try {
        const user= await User.findByIdAndUpdate(userId,{is_blocked:blockedStatus},{new:true});
        if(!user) return next(createError(404, "Doctor not found"));
        return res.status(200).json({user})
    } catch (error) {
        next(error)
    }
}

export const approveDoctor=async(req,res,next)=>{
    const {doctorId}=req.params
    try {

        const doctor= await Doctor.findByIdAndUpdate(doctorId,{isVerified:true})
        if(!doctor) return next(createError(404, "Doctor not found"));
        return res.status(201).json({success:true,message:"Approved"})

    } catch (error) {
        next(error)
    }
}

export const getAllUsers=async (req,res,next)=>{

    try {

        const allUsers=await User.find()
        res.status(200).json(allUsers)

    } catch (error) {
        next(error)
    }

}