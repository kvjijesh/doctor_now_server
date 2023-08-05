import express from 'express'
import { approveDoctor, blockDoctor, blockUser, getAllDoctors, getAllUsers } from '../controllers/admin.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router=express.Router();
router.get('/doctors-list',getAllDoctors)
router.get('/users-list',getAllUsers)
router.post('/block-doctor/:doctorId',blockDoctor)
router.post('/block-user/:userId',blockUser)
router.post('/approve/:doctorId',verifyAdmin,approveDoctor)


export default router