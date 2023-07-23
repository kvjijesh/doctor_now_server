import express from "express";
import { addDoctorDetails } from "../controllers/doctorController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();
router.put("/add-details", verifyToken, addDoctorDetails);

export default router;
