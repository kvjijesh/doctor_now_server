import express from 'express'
import { addSpeciality, allBookings, approveDoctor, blockDoctor, blockUser, deleteDepartment, getAllDoctors, getAllUsers, getDepartments } from '../controllers/admin.js';
import { verifyAdmin } from '../middlewares/verifyToken.js';
import {upload} from '../utils/multerConfig.js';

const router=express.Router();
router.get('/doctors-list',verifyAdmin,getAllDoctors)
router.get('/users-list',verifyAdmin,getAllUsers)
router.get('/departments',verifyAdmin,getDepartments)
router.put('/block-doctor/:doctorId',verifyAdmin,blockDoctor)
router.put('/block-user/:userId',verifyAdmin,blockUser)
router.put('/approve/:doctorId',verifyAdmin,approveDoctor)
router.post('/add-department',verifyAdmin,upload.single('image'),addSpeciality);
router.delete('/delete-department/:id',deleteDepartment);
router.get('/all-bookings',allBookings)


export default router