import Doctor from "../models/doctorModel.js";
import Appointment from '../models/appointmentModel.js'
import { createError } from "../utils/error.js";
export const addDoctorDetails = async (req, res, next) => {
  try {
    const existDoctor = await Doctor.findById(req.locals);
    console.log(req.body);

    if (!existDoctor) {
      return next(createError(404, "User not found"));
    }
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      { _id: req.locals },
      { ...req.body },
      { new: true }
    );
    return res.status(201).json({ updatedDoctor });
  } catch (error) {
    next(error);
  }
};
export const updateProfile = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    email,
    mobile,
    specialisation,
    qualification,
    registrationNumber,
    registrationCouncil,
    registrationYear,
    street,
    city,
    state,
    country,
    pin,
  } = req.body;
  if (req.file) {
    const imagePath = req.file.filename;
    const updatedDoctor = {
      name,
      email,
      mobile,
      specialisation,
      qualification,
      registrationNumber,
      registrationCouncil,
      registrationYear,
      street,
      city,
      state,
      country,
      pin,
      image: imagePath,
    };
    try {
      const doctor = await Doctor.findByIdAndUpdate(id, updatedDoctor, {
        new: true,
      });
      res.json(doctor);
    } catch (error) {
      next(error);
    }
  } else {
    const updatedDoctor = {
      name,
      email,
      mobile,
      specialisation,
      qualification,
      registrationNumber,
      registrationCouncil,
      registrationYear,
      street,
      city,
      state,
      country,
      pin,
    };
    try {
      const doctor = await Doctor.findByIdAndUpdate(id, updatedDoctor, {
        new: true,
      });
      res.json(doctor);
    } catch (error) {
      next(error);
    }
  }
};
export const addslots = async (req, res, next) => {
  const { doctorId, selectedDate } = req.body;
  console.log(selectedDate);
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return next(createError(404, "Doctor not found"));
    }
    if (doctor.availableSlots.includes(selectedDate)) {
      return next(createError(409,'slot unavailable'))
    }
    doctor.availableSlots.push(selectedDate);
    const updatedDoctor = await doctor.save();
    return res.status(200).json(updatedDoctor);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const deleteSlot = async (req, res, next) => {
  const { doctorId, slotToDelete } = req.body;
  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return next(createError(404, "Doctor not found"));
    }
    doctor.availableSlots = doctor.availableSlots.filter(
      (slot) => slot !== slotToDelete
    );

    const updatedDoctor = await doctor.save();

    res.status(200).json(updatedDoctor);
  } catch (error) {
    next(error);
  }
};

export const appointmentList=async(req,res,next)=>{
  try {
      const appointments=await Appointment.find();
      if(!appointments) return next(createError(404, "Appointments not found"));
      res.status(200).json(appointments)
  } catch (error) {
    next(error)
  }
}
