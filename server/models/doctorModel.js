import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  mobile: {
    type: Number,
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
  photos: {
    type: String,
  },
  specialisation: {
    type: String,
  },
  qualification: {
    type: [String],
  },
  services: {
    type: [String],
  },
  address: {
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
      type: Number,
    },
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
    type: Number,
    default: 0,
  },
  textChatFee: {
    type: Number,
    default: 0,
  },
  offlineFee: {
    type: Number,
    default: 0,
  },
  slots: [
    {
      day: {
        type: Date,
      },
      bookedSlots: [
        {
          type: String,
        },
      ],
    },
  ],

});

export default mongoose.model("Doctor", DoctorSchema);
