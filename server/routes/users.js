import express from 'express'
import User from "../models/userModel.js"
import { getUsers, updateUser } from '../controllers/userController.js';
import { verifyToken, verifyUser } from '../utils/verifyToken.js';

const router=express.Router();


router.get("/users",getUsers)

router.get("/authentication",verifyToken,(req,res)=>{
    res.send("You are authenticated")
})
router.get("/check/:id",verifyUser,(req,res)=>{
    res.send("hello user you are autherised you can update or delete")
})
router.put('/update/:id',updateUser)
export default router