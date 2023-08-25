import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
export const checkUserBlock = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.JWT, async (err, decodedToken) => {
        if (err) {
          return next(createError(403, "Token not valid"));
        }
        req.local = decodedToken.id;
        const userId = req.local;
        const user = await User.findById(userId);

        if (user && user.is_blocked) {
          return res.status(403).json({ message: "You are blocked" });
        }

        next();
      });
    } catch (error) {
      console.log(error);
    }
  };
