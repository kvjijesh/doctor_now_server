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
        default: "pending",
      },
      appointment_id:{
        type:Number
      },
      reason:{
        type:String
      },
      payment_mode:{
        type:[String],
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
      },
      findings:{
        type:String
      },
      prescription:[
        {
          medicine:{type:String},
          frequency:{type:String}
        }
      ],
      advice:{type:String}

  }, {
    timestamps: true,
  });

export default mongoose.model("Appointment", AppointmentSchema);