import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import Review from "../models/reviewModel.js";
import Appointment from "../models/appointmentModel.js";
import { createError } from "../utils/error.js";
import Speciality from "../models/specialityModel.js";
import stripePackage from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = stripePackage(`${process.env.STRIPE_KEY}`);

export const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({ is_blocked: false });
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      userName,
      userEmail,
      userMobile,
      userStreet,
      userCity,
      userState,
      userPin,
      imgUrl,
    } = req.body;

    const updatedUserData = {
      name: userName,
      email: userEmail,
      mobile: userMobile,
      street: userStreet,
      city: userCity,
      state: userState,
      pin: userPin,
      image: imgUrl,
    };
    const user = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });
    if (!user) return next(createError(404, "User not found"));
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user details." });
  }
};

export const availableDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({ isVerified: true, is_submitted: true })
      .populate("specialisation")
      .exec();
    if (!doctors) return next(createError(404, "No doctors found"));
    res.status(200).json(doctors);
  } catch (error) {
    next(error);
  }
};

export const confirmAppointment = async (metadata, paymentdata, req, res) => {
  const { doctorId, slot, userId } = metadata;

  try {
    // const existAppointment = await Appointment.findOne({ slot: slot });

    // if (existAppointment) return res.status(409).send("already exist");
    const appointment = new Appointment({
      userId,
      doctorId,
      slot,
      appointment_id: Math.floor(Math.random() * 1000000 + 1),
      payment_mode: paymentdata.payment_method_types,
      payment_status: paymentdata.status,
      amount_paid: paymentdata.amount_received / 100,
    });
    appointment.save();
    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { $push: { bookedSlots: slot }, $pull: { availableSlots: slot } },
      { new: true }
    );

    res.status(201).json({ appointment });
  } catch (error) {
    res.status(500).send("something wrong");
  }
};
export const allDept = async (req, res, next) => {
  try {
    const allDept = await Speciality.find();
    if (!allDept) return next(createError(404, "No departments found"));
    res.status(200).json(allDept);
  } catch (error) {
    next(error);
  }
};

export const userBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bookings = await Appointment.find({ userId: id })
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("doctorId")
      .exec();
    if (!bookings) next(createError(404, "No Bookings available"));
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

export const cancellBooking = async (req, res, next) => {
  const { id } = req.params;
  try {
    const cancell = await Appointment.findByIdAndUpdate(id, {
      status: "cancelled",
    });
    if (!cancell) return next(createError(404, "Appointment not found"));
    const doctorId = cancell.doctorId;
    const slotToPush = cancell.slot;
    const updateDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { $push: { availableSlots: slotToPush } },
      { new: true }
    );

    res.status(200).json("Cancelled");
  } catch (error) {
    next(error);
  }
};

export const stripeSession = async (req, res, next) => {
  const { doctorData, user, slot } = req.body;
  const existAppointment = await Appointment.findOne({ slot: slot });

  if (existAppointment)
    return next(createError(409, " Appointment already exist"));
  const customer = await stripe.customers.create({
    metadata: {
      userId: user._id,
      doctorId: doctorData._id,
      slot: slot,
    },
  });
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `Dr.${doctorData.name}`,
          },
          unit_amount: `${doctorData?.videoChatFee * 100}`,
        },
        quantity: 1,
      },
    ],
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/booking-success`,
    cancel_url: `${process.env.CLIENT_URL}`,
  });

  res.send({ url: session.url });
};

export const webhooks = async (req, res) => {
  let signInSecret = `${process.env.STRIPE_WEBHOOK_KEY}`;
  const payload = req.body;

  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, signInSecret);
  } catch (error) {
    res.status(400).json({ success: true });
    return;
  }

  if (event.type === "payment_intent.succeeded") {
    stripe.customers.retrieve(event.data.object.customer).then((customer) => {
      confirmAppointment(customer.metadata, event.data.object, req, res);
    });
  }

  // res.end();
};

export const findUser = async (req, res, next) => {
  try {
    const user = await User.findById();
    if (!user) return next(createError(404, "User Notfound"));
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const rating = async (req, res, next) => {
  try {
    const { userId, doctorId, value, review } = req.body;
    const rating = new Review({
      userId,
      doctorId,
      rating: value,
      feeedback: review,
    });
    await rating.save();
    if (!rating) return next(createError(404, "Ratings not generated"));
    res.status(201).json({ rating, message: "Ratings added" });
  } catch (error) {
    next(error);
  }
};

export const getRatings = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    const allRatings = await Review.find({ doctorId: id })
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })
      .populate("userId")
      .exec();
    if (!allRatings) return next(createError(404, "No reviews found"));
    const result = await Review.find({ doctorId: id });
    if (result.length === 0) return res.json({ allRatings, averageRating: 0 });
    const totalRatings = result.reduce((acc, rating) => acc + rating.rating, 0);
    const averageRating = (totalRatings / result.length).toFixed(1);
    res.status(200).json({ allRatings, averageRating });
  } catch (error) {
    console.log(error);
    next(createError(500, `Internal server error`));
  }
};

export const updateUserNotification = async (req, res, next) => {
  try {
    const { id, notification } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existNotification = user.notifications.find(
      (n) => n._id.toString() === notification
    );

    if (!existNotification) {
      return next(createError(404, "Notification not fond"));
    }

    existNotification.read = true;

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return next(createError(500, "Internal server error"));
  }
};

export const getDoctorsByDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const doctors = await Doctor.find({
      specialisation: id,
      is_submitted: true,
      isVerified: true,
    })
      .populate("specialisation")
      .exec();
    if (!doctors) return next(createError(404, "Doctors not found"));
    res.status(200).json(doctors);
  } catch (error) {
    return next(createError(500, "Internal server error"));
  }
};

export const topDoctors = async (req, res, next) => {
  try {
    const topDoctors = await Doctor.find().populate('specialisation').limit(4).exec();
    if (!topDoctors) return next(createError(404, "Doctors not found"));

    res.status(200).json(topDoctors);
  } catch (error) {
    console.error(error);
    return next(createError(500, "Internal server error"));
  }
};
