import Doctor from '../models/doctorModel.js'
import { createError } from '../utils/error.js';
export const addDoctorDetails=async (req,res,next)=>{

    try {

        const existDoctor= await Doctor.findById(req.locals)
        console.log(req.body);

        if(!existDoctor){
            return next(createError(404, "User not found"));
        }
        const updatedDoctor=await Doctor.findByIdAndUpdate({_id:req.locals},{...req.body})
        return res.status(201).send("updated successfully")


    } catch (error) {
        next(error)

    }



}