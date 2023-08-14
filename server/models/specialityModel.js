import mongoose from "mongoose";

const SpecialisationSchema= new mongoose.Schema({
    name:{
        type:String
    },
    is_blocked:{
        type:Boolean,
        default:false,
    },
    image:{
        type:String,

    }

},{timestamps:true});
export default mongoose.model("Specialisation",SpecialisationSchema)
