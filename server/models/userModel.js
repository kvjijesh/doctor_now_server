import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    photos:{
        type:String

    },

    is_blocked:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    personal_profile:{
       dob: {
        type:Date
        },
        gender:{
            type:String
        },
        blood_group:{
            type:String
        },
        height:{
            type:Number
        },
        weight:{
            type:Number

        },
        location:{
            type:String
        }
    },
    medical_profile:{
        allergies:{
            type:[String]
        },
        medications:{
            type:[String]
        },
        chronic_diseases:{
            type:[String]
        },
        surgeries:{
            type:[String]
        },

    },
})
export default mongoose.model("User",UserSchema)