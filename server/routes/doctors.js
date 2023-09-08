import express from "express";
import { addDoctorDetails, addslots, appointmentList, deleteSlot, endAppointment, prescription, totalAppointments, updateAppointment, updateProfile } from "../controllers/doctorController.js";
import { verifyUser } from "../middlewares/verifyToken.js";
import {upload, uploadDocument} from '../utils/multerConfig.js'
import { checkUserBlock } from "../middlewares/checkBlockStatus.js";

const router = express.Router();
router.post("/add-details", verifyUser('doctor'),checkUserBlock,uploadDocument.single('document'), addDoctorDetails);
router.put('/update/:id',verifyUser('doctor'),upload.single('image'),updateProfile)
router.post('/add-slots',verifyUser('doctor'),checkUserBlock,addslots)
router.delete('/delete-slot',verifyUser('doctor'),checkUserBlock,deleteSlot)
router.get('/appointment-list/:id',verifyUser('doctor'),checkUserBlock,appointmentList)
router.put('/update-status/:id',verifyUser('doctor'),checkUserBlock,updateAppointment);
router.put('/generate-prescription',verifyUser('doctor'),checkUserBlock,prescription)
router.patch('/endAppointment/:id',verifyUser('doctor'),checkUserBlock,endAppointment)
router.get('/total-appointments/:id',verifyUser('doctor'),totalAppointments)

export default router;
