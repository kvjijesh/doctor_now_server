import Doctor from "../models/doctorModel.js"
//get all doctors

export const getAllDoctors=async (req,res,next)=>{

    try {

        const allDoctors=await Doctor.find()
        res.status(200).json(allDoctors)

    } catch (error) {
        next(error)
    }

}