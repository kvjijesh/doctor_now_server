import User from "../models/userModel.js";


export const getUsers= async(req,res,next)=>{
    try {
        const allUsers= await User.find()
        res.status(200).json(allUsers)
    } catch (err) {
        next(err)
    }

}