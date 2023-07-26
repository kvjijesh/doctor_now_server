import Doctor from "../models/doctorModel.js"
import { createError } from "../utils/error.js"
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