import express from 'express'
import User from "../models/userModel.js"
import { allDept, availableDoctors, cancellBooking, confirmAppointment, findUser, getUsers, rating, stripeSession, updateUser, userBooking, webhooks } from '../controllers/userController.js';
import {  verifyUser } from '../middlewares/verifyToken.js';
import {upload} from '../utils/multerConfig.js';
import {checkUserBlock} from '../middlewares/checkBlockStatus.js'

const router=express.Router();

router.get("/available-doctors",availableDoctors)
router.post('/update/:id',verifyUser('user'),checkUserBlock,updateUser)
router.post('/confirm-appointment',verifyUser('user'),checkUserBlock,confirmAppointment);
router.get('/all-departments',allDept);
router.get('/user-bookings/:id',verifyUser('user'),checkUserBlock,userBooking);
router.patch('/cancell-bookings/:id',verifyUser('user'),checkUserBlock,cancellBooking)
router.post('/create-checkout-session', stripeSession);
router.post('/webhook',express.raw({type:'application/json'}),webhooks);
router.get('/userdetails',findUser)
router.post('/ratings',verifyUser('user'),checkUserBlock,rating)
export default router