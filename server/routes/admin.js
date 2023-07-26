import express from 'express'
import { approveDoctor, blockDoctor, getAllDoctors } from '../controllers/admin.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router=express.Router();
router.get('/doctors-list',getAllDoctors)
router.post('/block-doctor/:doctorId',blockDoctor)
router.post('/approve/:doctorId',verifyAdmin,approveDoctor)


export default router