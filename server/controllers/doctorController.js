import Doctor from "../models/doctorModel.js";
import User from '../models/userModel.js'
import Appointment from "../models/appointmentModel.js";
import { createError } from "../utils/error.js";
export const addDoctorDetails = async (req, res, next) => {
  const id = req.body.id;

  try {
    const existDoctor = await Doctor.findById(id);

    if (!existDoctor) {
      return next(createError(404, "User not found"));
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      { _id: id },
      { ...req.body.newValues },
      { new: true }
    );
    return res.status(201).json({ updatedDoctor });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const updateProfile = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    email,
    mobile,
    //specialisation,
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
      // specialisation,
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
      }).populate('specialisation').exec();
      res.json(doctor);
    } catch (error) {
      next(error);
    }
  } else {
    const updatedDoctor = {
      name,
      email,
      mobile,
      //specialisation,
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
      }).populate('specialisation').exec();
      res.json(doctor);
    } catch (error) {
      next(error);
    }
  }
};
export const addslots = async (req, res, next) => {
  const { doctorId, selectedDate } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return next(createError(404, "Doctor not found"));
    }
    if(!doctor.isVerified) return next(createError(401,"You are not verified"))
    if (doctor.availableSlots.includes(selectedDate)) {
      return next(createError(409, "slot already exists"));
    }
    doctor.availableSlots.push(selectedDate);
    const updatedDoctor = await doctor.save();
    return res.status(200).json(updatedDoctor);
  } catch (error) {
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

export const appointmentList = async (req, res, next) => {
  const { id } = req.params;
  try {
    const appointments = await Appointment.find({ doctorId: id })
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("doctorId")
      .exec();
    if (!appointments) return next(createError(404, "Appointments not found"));
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};
export const updateAppointment = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    if (!appointment) return next(createError(404, "Appointment not found"));
    const userid=appointment.userId;
    const user=await User.findById(userid)
    const notification = {
      message: `Your appointment is ${status}`,
      timestamp: new Date(),
      read: false,
    };
    user.notifications.push(notification);
    await user.save()
    res.status(200).json({ appointment, message: "Appointment updated" });
  } catch (error) {
    next(error);
  }
};

export const prescription = async (req, res, next) => {

  try {
    const { findings, medicines, advice, id } = req.body;
    const appointment = await Appointment.findById(id);
    if (!appointment) return next(createError(404, "Appointment not found"));
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, {
      findings,
      prescription: medicines,
      advice,
    });
    res
      .status(200)
      .json({ updatedAppointment, message: "prescription updated" });
  } catch (error) {
    next(error);
  }
};

export const endAppointment = async (req, res, next) => {
  try {

    const { id } = req.params;
    const updateAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "completed" },
      { new: true }
    );
    if (!updateAppointment)
      return next(createError(404, " Appointment not found"));
    const docId=updateAppointment.doctorId
    const doctor= await Doctor.findById(docId);
    if(!doctor) return next(createError(404,"Doctor not found"))
    const amount=(doctor?.payments)+(updateAppointment.amount_paid)*80/100
    const updateFees= await Doctor.findByIdAndUpdate(docId,{payments:amount},{new:true})
    res.status(200).json({ updateAppointment, message: "Appointment Ended" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const totalAppointments= async(req,res,next)=>{

  try {
    const {id}=req.params;
    const totalAppointments= await Appointment.find({doctorId:id}).count();
    if(!totalAppointments) return next(createError(404,"No Appointments found"))
    res.status(200).json(totalAppointments)

  } catch (error) {
    next(error)
  }
}



export const updateNotification = async (req, res, next) => {
  try {
    const { id, notification } = req.body;

    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const existNotification = doctor.notifications.find(
      (n) => n._id.toString() === notification
    );

    if (!existNotification) {
      return next(createError(404,"Notification not fond"))
    }

    existNotification.read = true;

    await doctor.save();

    return res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    return next(createError(500,"Internal server error"))
  }
};