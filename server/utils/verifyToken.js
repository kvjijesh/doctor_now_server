import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken =(req,res,next)=>{
const token=req.headers.authorization?.split(" ")[1]

if(!token){
    return next(createError(401,"You are not authenticated"))
}
jwt.verify(token,process.env.JWT,(err,user)=>{
    if(err) return next(createError(403,"Token not valid"))
    req.locals=user.id;
    console.log(req.locals);
    next()
})
}

export const verifyUser=(req,res,next)=>{

    verifyToken(req,res,next,()=>{

        if(req.user.id===req.params.id){
            next()
        }else{
            return next(createError(403,"You are not autherised"))
        }
    })
}
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.is_Admin){
            next()
        }else{
            return next(createError(403,"You are not autherised"))
        }
    })
}