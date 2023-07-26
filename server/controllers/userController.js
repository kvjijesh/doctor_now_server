import User from "../models/userModel.js";


export const getUsers= async(req,res,next)=>{
    try {
        const allUsers= await User.find()
        res.status(200).json(allUsers)
    } catch (err) {
        next(err)
    }

}
export const updateUser=async(req,res,next)=>{

    const {id}=req.params
    console.log(id)
    try {
        const user= await User.findByIdAndUpdate(id,req.body,{new:true})
        res.json(user)

    } catch (error) {

    }
}