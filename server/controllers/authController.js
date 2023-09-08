import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import NodeCache from "node-cache";
import { sendOtp } from "../utils/otp.js";

const userCache = new NodeCache();
const doctorCache = new NodeCache();
const otpCache = new NodeCache();
const otpDoctorCache = new NodeCache();

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, otp } = req.body;
    userCache.set(email, { name, email, password });
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.staus(409).send("User already exists");
    }
    const cOtp = await sendOtp(name, email);
    otpCache.set(email, { cOtp });
    res.status(200).send("OTP send");
  } catch (err) {
    next(err);
  }
};

export const resendOtp = async (req, res, next) => {
  const { name, email, password, otp } = req.body;
  try {
    const cOtp = await sendOtp(name, email);
    otpCache.set(email, { cOtp });
    res.status(200).send("OTP send");
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = userCache.get(email);
    const cacheOtp = otpCache.get(email);
    if (!user) return next(createError(404, "User not found"));
    if (cacheOtp.cOtp === otp) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      const newUser = new User({
        name: user.name.charAt(0).toUpperCase() + user.name.slice(1),
        email: user.email,
        password: hash,
      });

      await newUser.save();
      userCache.del(email);
      otpCache.del(email);
      res.status(201).send("User created");
    } else {
      res.status(400).send("OTP Invalid");
    }
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    if (user.is_blocked) return next(createError(400, "Please contact admin"));

    const isCorrectPassword = await bcrypt.compare(pass, user.password);
    if (!isCorrectPassword)
      return next(createError(400, "Wrong email or password"));
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT);
    const { password, ...otherDetails } = user._doc;
    res.status(200).json({ token, ...otherDetails });

  } catch (err) {
    next(err);
  }
};

export const registerDoctor = async (req, res, next) => {
  try {
    const { name, email, password, otp } = req.body;
    doctorCache.set(email, { name, email, password });
    const existing = await Doctor.findOne({ email });

    if (existing) {
      return res.staus(409).send("User already exists");
    }
    const dOtp = await sendOtp(name, email);
    otpDoctorCache.set(email, { dOtp });

    res.status(200).send("OTP send");
  } catch (err) {
    next(err);
  }
};

export const verifyDoctorOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const doctor = doctorCache.get(email);
    const cacheOtp = otpDoctorCache.get(email);
    if (!doctor) return next(createError(404, "User not found"));
    if (cacheOtp.dOtp === otp) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(doctor.password, salt);

      const newDoctor = new Doctor({
        name: doctor.name.charAt(0).toUpperCase() + doctor.name.slice(1),
        email: doctor.email,
        password: hash,
      });

      await newDoctor.save();

      doctorCache.del(email);
      otpDoctorCache.del(email);
      res.status(201).send("User created");
    } else {
      res.status(400).send("OTP Invalid");
    }
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
export const doctorlogout = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

export const doctorLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const pass = req.body.password;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return next(createError(404, "User not found"));
    }
    if (doctor.is_blocked) return next(createError(400, "You are blocked Please contact admin"));
    const isCorrectPassword = await bcrypt.compare(pass, doctor.password);
    if (!isCorrectPassword)
      return next(createError(400, "Wrong email or password"));
    const token = jwt.sign(
      { id: doctor._id, role: doctor.role },
      process.env.JWT
    );
    const { password, ...otherDetails } = doctor._doc;
    res.status(200).json({ token, ...otherDetails });
  } catch (err) {
    next(err);
  }
};
