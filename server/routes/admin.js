import express from 'express'
import { getAllDoctors } from '../controllers/admin.js';

const router=express.Router();
router.get('/doctors-list',getAllDoctors)


export default router