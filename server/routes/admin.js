import express from 'express'
import { addSpeciality, allBookings, approveDoctor, blockDoctor, blockUser, deleteDepartment, getAllDoctors, getAllUsers, getDepartments } from '../controllers/admin.js';
import { verifyAdmin } from '../utils/verifyToken.js';
import upload from '../utils/multerConfig.js';

const router=express.Router();
router.get('/doctors-list',getAllDoctors)
router.get('/users-list',getAllUsers)
router.get('/departments',getDepartments)
router.put('/block-doctor/:doctorId',blockDoctor)
router.put('/block-user/:userId',blockUser)
router.put('/approve/:doctorId',verifyAdmin,approveDoctor)
router.post('/add-department',upload.single('image'),addSpeciality);
router.delete('/delete-department/:id',deleteDepartment);
router.get('/all-bookings',allBookings)


export default router