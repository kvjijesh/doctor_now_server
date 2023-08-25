import express from 'express'
import User from "../models/userModel.js"
import { allDept, availableDoctors, cancellBooking, confirmAppointment, findUser, getUsers, stripeSession, updateUser, userBooking, webhooks } from '../controllers/userController.js';
import { verifyToken, verifyUser } from '../middlewares/verifyToken.js';
import {upload} from '../utils/multerConfig.js';
import {checkUserBlock} from '../middlewares/checkBlockStatus.js'

const router=express.Router();

router.get("/available-doctors",availableDoctors)
router.post('/update/:id',verifyUser,checkUserBlock,updateUser)
router.post('/confirm-appointment',verifyUser,checkUserBlock,confirmAppointment);
router.get('/all-departments',allDept);
router.get('/user-bookings/:id',verifyUser,checkUserBlock,userBooking);
router.patch('/cancell-bookings/:id',verifyUser,checkUserBlock,cancellBooking)
router.post('/create-checkout-session', stripeSession);
router.post('/webhook',express.raw({type:'application/json'}),webhooks);
router.get('/userdetails',findUser)
export default router