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
    image:{
        type:String
    },

    is_blocked:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:'user'
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
    street:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pin:{
        type:String
    },
    notifications: [
        {
          message: String,
          timestamp: Date,
          read: Boolean,
        },
    ]
})
export default mongoose.model("User",UserSchema)