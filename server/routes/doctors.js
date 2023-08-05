import express from "express";
import { addDoctorDetails, addslots, updateProfile } from "../controllers/doctorController.js";
import { verifyToken } from "../utils/verifyToken.js";
import upload from '../utils/multerConfig.js'

const router = express.Router();
router.put("/add-details", verifyToken, addDoctorDetails);
router.put('/update/:id',upload.single('image'),updateProfile)
router.post('/add-slots',addslots)


export default router;
