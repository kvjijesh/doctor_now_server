import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import Doctor from '../models/doctorModel.js'
import { createError } from '../utils/error.js';

export const checkUserBlock = async (req, res, next) => {

  try {

      let user;
      if (res.locals.userRole === 'user') {
        user = await User.findById(res.locals.userId);
      } else if (res.locals.userRole === 'doctor') {
        user = await Doctor.findById(res.locals.userId);
      }
      
      if (user && user.is_blocked) {
        return res.status(403).json({ message: "You are blocked" });
      }

      next();

  } catch (error) {
    next(error);
  }
};
