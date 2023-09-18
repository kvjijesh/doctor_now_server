import express from 'express'
import { addSpeciality, allBookings, approveDoctor, blockDoctor, blockUser, deleteDepartment, docCount, getAllDoctors, getAllUsers, getDepartments, totalRevenue, userCont } from '../controllers/admin.js';
import {verifyUser } from '../middlewares/verifyToken.js';
import {upload} from '../utils/multerConfig.js';

const router=express.Router();
router.get('/doctors-list',verifyUser('admin'),getAllDoctors)
router.get('/users-list',verifyUser('admin'),getAllUsers)
router.get('/departments',verifyUser('admin'),getDepartments)
router.put('/block-doctor/:doctorId',verifyUser('admin'),blockDoctor)
router.put('/block-user/:userId',verifyUser('admin'),blockUser)
router.put('/approve/:doctorId',verifyUser('admin'),approveDoctor)
router.post('/add-department',verifyUser('admin'),addSpeciality);
router.delete('/delete-department/:id',verifyUser('admin'),deleteDepartment);
router.get('/all-bookings',verifyUser('admin'),allBookings)
router.get('/user-count',verifyUser('admin'),userCont)
router.get('/doctor-count',verifyUser('admin'),docCount)
router.get('/total-revenue',verifyUser('admin'),totalRevenue)


export default router