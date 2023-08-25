import express from 'express'
import { login, verifyOtp,registerUser, logout, registerDoctor, verifyDoctorOtp, doctorLogin, doctorlogout, resendOtp} from '../controllers/authController.js';
import { checkUserBlock } from '../middlewares/checkBlockStatus.js';

const router=express.Router();
router.post('/signup',registerUser)
router.post('/verifyotp',verifyOtp)
router.post('/resend-otp',resendOtp)
router.post('/login',login)
router.post('/logout',logout);
router.post('/doctorsignup',registerDoctor)
router.post('/verifydoctorotp',verifyDoctorOtp)
router.post('/doctorlogin',doctorLogin)
router.post('/doctorlogout',doctorlogout)

export default router