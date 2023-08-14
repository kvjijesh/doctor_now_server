import express from "express";
import { addDoctorDetails, addslots, appointmentList, deleteSlot, updateAppointment, updateProfile } from "../controllers/doctorController.js";
import { verifyToken } from "../utils/verifyToken.js";
import upload from '../utils/multerConfig.js'

const router = express.Router();
router.post("/add-details", verifyToken, addDoctorDetails);
router.put('/update/:id',verifyToken,upload.single('image'),updateProfile)
router.post('/add-slots',verifyToken,addslots)
router.delete('/delete-slot',deleteSlot)
router.get('/appointment-list/:id',appointmentList)
router.put('/update-status/:id',verifyToken,updateAppointment)


export default router;
