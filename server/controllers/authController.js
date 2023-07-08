import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User created");
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
    const isCorrectPassword = await bcrypt.compare(pass, user.password);
    if (!isCorrectPassword)
      return next(createError(400, "Wrong email or password"));
    const token = jwt.sign(
      { id: user._id, is_Admin: user.is_Admin },
      process.env.JWT
    );
    const { password, is_Admin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
