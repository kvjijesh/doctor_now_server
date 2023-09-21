import mongoose, { Schema } from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "doctor",
    },
    image: {
      type: String,
    },
    gender: {
      type: String,
    },
    specialisation: {
      type: Schema.Types.ObjectId,
      ref: "Specialisation",
    },
    qualification: {
      type: [String],
    },
    services: {
      type: [String],
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    pin: {
      type: String,
    },
    registrationNumber: {
      type: String,
    },
    registrationCouncil: {
      type: String,
    },
    registrationYear: {
      type: String,
    },
    is_Admin: {
      type: Boolean,
      default: false,
    },
    videoAvailable: {
      type: Boolean,
      default: true,
    },
    chatAvailable: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    is_blocked: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
    },
    videoChatFee: {
      type: String,
      default: 0,
    },
    textChatFee: {
      type: String,
      default: 0,
    },
    offlineFee: {
      type: String,
      default: 0,
    },

    is_submitted: {
      type: Boolean,
      default: false,
    },
    availableSlots: [
      {
        type: String,
      },
    ],
    bookedSlots: [
      {
        type: String,
      },
    ],
    document: {
      type: String,
    },
    payments: { type: Number, default: 0 },
    notifications: [
      {
        message: String,
        timestamp: Date,
        read: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", DoctorSchema);
