import express from 'express'
import User from "../models/userModel.js"
import { allDept, availableDoctors, cancellBooking, confirmAppointment, getUsers, updateUser, userBooking } from '../controllers/userController.js';
import { verifyToken, verifyUser } from '../utils/verifyToken.js';
import upload from '../utils/multerConfig.js';

const router=express.Router();


router.get("/users",getUsers)
router.get("/available-doctors",availableDoctors)

/*router.get("/authentication",verifyToken,(req,res)=>{
    res.send("You are authenticated")
})*/
router.get("/check/:id",verifyUser,(req,res)=>{
    res.send("hello user you are autherised you can update or delete")
})
router.put('/update/:id',verifyUser,upload.single('image'),updateUser)
router.post('/confirm-appointment',verifyUser,confirmAppointment);
router.get('/all-departments',allDept);
router.get('/user-bookings/:id',userBooking);
router.patch('/cancell-bookings/:id',cancellBooking)
export default router