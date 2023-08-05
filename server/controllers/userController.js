import User from "../models/userModel.js";
import Doctor from '../models/doctorModel.js'

export const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({is_blocked:false});
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, mobile, street, city, state, pin } = req.body;
  console.log(req.body)
  if (req.file) {
    const imagePath = req.file.filename;

    const updatedUserData = {
      name: name,
      email: email,
      mobile: mobile,
      street: street,
      city: city,
      state: state,
      pin: pin,
      image: imagePath,
    };
    try {
      const user = await User.findByIdAndUpdate(id, updatedUserData, {
        new: true,
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user details." });
    }
  } else {
    const updatedUserData = {
      name: name,
      email: email,
      mobile: mobile,
      street: street,
      city: city,
      state: state,
      pin: pin,
    };
    try {
      const user = await User.findByIdAndUpdate(id, updatedUserData, {
        new: true
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user details." });
    }
  }
};

export const availableDoctors= async(req,res,next)=>{
  try {
    const doctors= await Doctor.find({isVerified:true,is_submitted:true})
    if(!doctors) return
    res.status(200).json(doctors)

  } catch (error) {
    next(error)
  }
}
