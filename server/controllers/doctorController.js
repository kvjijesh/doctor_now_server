import Doctor from "../models/doctorModel.js";
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
  const { doctorId, selectedDate, selectedTime } = req.body;
  console.log(selectedDate)
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return next(createError(404, "Doctor not found"));
    }

    doctor.availableSlots.push({ date: selectedDate, time: selectedTime });
    const updatedDoctor=await doctor.save();
    return res.status(200).json(updatedDoctor);
  } catch (error) {
    console.log(error.message)
    next(error);
  }
};
