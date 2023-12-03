const mongoose = require("mongoose");
const { Schema } = mongoose;

const RealtorSchema = new Schema(
  {
    name: String,
    loginEmail: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: String,
    contactEmail: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/,
    },
    logo: String,
    reviews: [
      {
        date: { type: Date, required: true, default: Date.now },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
          name: { type: String, required: true },
          avatar: String,
        },
      },
    ],
    phone: { type: String, required: true },
    notifications: [
      {
        date: { type: Date, default: Date.now },
        message: { type: String, required: true },
        listingId: { type: mongoose.Schema.Types.ObjectId, ref: "listings" },
      },
    ],
    creationDate: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Realtors = mongoose.model("Realtor", RealtorSchema);

module.exports = Realtors;
