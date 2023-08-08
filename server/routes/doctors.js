import express from "express";
import { addDoctorDetails, addslots, appointmentList, deleteSlot, updateProfile } from "../controllers/doctorController.js";
import { verifyToken } from "../utils/verifyToken.js";
import upload from '../utils/multerConfig.js'

const router = express.Router();
router.put("/add-details", verifyToken, addDoctorDetails);
router.put('/update/:id',upload.single('image'),updateProfile)
router.post('/add-slots',addslots)
router.delete('/delete-slot',deleteSlot)
router.get('/appointment-list',appointmentList)


export default router;
