import Doctor from "../models/doctorModel.js";
import { createError } from "../utils/error.js";
import User from "../models/userModel.js";
import Speciality from "../models/specialityModel.js";
import Appointment from '../models/appointmentModel.js'
//get all doctors

export const getAllDoctors = async (req, res, next) => {
  try {
    const allDoctors = await Doctor.find();
    if (!allDoctors) return next(createError(404, "No doctors found"));
    res.status(200).json(allDoctors);
  } catch (error) {
    next(error);
  }
};

export const blockDoctor = async (req, res, next) => {
  const { doctorId } = req.params;
  const { blockedStatus } = req.body;
  console.log(doctorId, blockedStatus);

  try {
    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { is_blocked: blockedStatus },
      { new: true }
    );
    if (!doctor) return next(createError(404, "Doctor not found"));
    return res.status(200).json({ doctor });
  } catch (error) {
    next(error);
  }
};
export const blockUser = async (req, res, next) => {
  const { userId } = req.params;
  const { blockedStatus } = req.body;
  console.log(userId, blockedStatus);

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { is_blocked: blockedStatus },
      { new: true }
    );
    if (!user) return next(createError(404, "Doctor not found"));
    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const approveDoctor = async (req, res, next) => {
  const { doctorId } = req.params;
  try {
    const doctor = await Doctor.findByIdAndUpdate(doctorId, {
      isVerified: true,
    });
    if (!doctor) return next(createError(404, "Doctor not found"));
    return res.status(201).json({ success: true, message: "Approved" });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export const addSpeciality = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (req.file) {
      const image = req.file.filename;
      console.log(image);
      const speciality = await Speciality.findOne({ name: name });
      if (speciality) return next(createError(409, "Already exist"));
      const newSpeciality = new Speciality({ name, image });
      newSpeciality.save();
      res.status(201).json(newSpeciality);
    } else {
      return next(createError(400, "Image should be uploaded"));
    }
  } catch (error) {
    next(error);
  }
};

export const getDepartments = async (req, res, next) => {
  try {
    const departments = await Speciality.find();
    if (!departments) return next(createError(404, " No departments found"));
    res.status(200).send(departments);
  } catch (error) {
    next(error);
  }
};
export const deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteSlot = await Speciality.findByIdAndDelete(id);
    if (!deleteSlot) return next(createError(404, "Department not found"));
    res.status(200).json("deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const allBookings=async(req,res,next)=>{

  try {
    const bookings= await Appointment.find().populate('userId').populate('doctorId').exec();
    if(!bookings) return next(createError(404,"No bookings found"));
    res.status(200).json(bookings)

  } catch (error) {
    next(error)

  }

}