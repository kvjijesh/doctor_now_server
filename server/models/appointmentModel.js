import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
      doctorId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Doctor",
        required: true,
      },
      slot:{
        type:String,
      },
      status: {
        type: String,
        default: "Pending",
      },
      appointment_id:{
        type:Number
      },
      reason:{
        type:String
      },
      payment_mode:{
        type:String,
      },
      amount_paid:{
        type:Number,
      },
      payment_status:{
        type:String
      },
      appointment_mode:{
        type:String,
        default:'offline'
      }

  }, {
    timestamps: true,
  });

export default mongoose.model("Appointment", AppointmentSchema);