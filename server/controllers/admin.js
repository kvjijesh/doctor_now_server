import Doctor from "../models/doctorModel.js";
import { createError } from "../utils/error.js";
import User from "../models/userModel.js";
import Speciality from "../models/specialityModel.js";
import Appointment from "../models/appointmentModel.js";
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
  try {
    const { doctorId } = req.params;
    const { blockedStatus } = req.body;
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
    const approvalNotification = {
      message: 'Your account has been approved by the admin.',
      timestamp: new Date(),
      read: false,
    };
    doctor.notifications.push(approvalNotification);
    await doctor.save();
    return res.status(201).json({ success: true, message: "Approved" });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({ role: "user" });
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export const addSpeciality = async (req, res, next) => {
  try {
    const { name,image } = req.body;
    console.log(req.body);
    if (image) {
      

      const speciality = await Speciality.findOne({ name: name });
      if (speciality) return next(createError(409, "Already exist"));
      const newSpeciality = new Speciality({ name, image });
      newSpeciality.save();
      res.status(201).json({
        message: "Speciality added",
        newSpeciality: newSpeciality,
      });
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

    const deleteSpeciality = await Speciality.findByIdAndDelete(id);
    if (!deleteSpeciality)
      return next(createError(404, "Department not found"));
    const department = await Speciality.find();
    res
      .status(200)
      .json({ message: "Deleted successfully", department: department });
  } catch (error) {
    next(error);
  }
};

export const allBookings = async (req, res, next) => {
  try {
    const bookings = await Appointment.find()
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("doctorId")
      .exec();
    if (!bookings) return next(createError(404, "No bookings found"));
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal server error"));
  }
};
export const userCont = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    if (!userCount) return next(createError(404, "No users found"));
    res.status(200).json(userCount);
  } catch (error) {
    next(error);
  }
};
export const docCount = async (req, res, next) => {
  try {
    const doctorCount = await Doctor.countDocuments();
    if (!doctorCount) return next(createError(404, "No doctors found"));
    res.status(200).json(doctorCount);
  } catch (error) {
    next(error);
  }
};

export const totalRevenue = async (req, res, next) => {
  try {
    const sum = await Appointment.aggregate([
      {
        $group: {
          _id: null,
          totalAmountPaid: { $sum: "$amount_paid" },
        },
      },
    ]);

    res.status(200).json({ totalAmountPaid: sum[0]?.totalAmountPaid || 0 });
  } catch (error) {}
};
