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
        date: Date,
        rating: mongoose.Schema.Types.Decimal128,
        comment: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      },
    ],
    phone: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Realtors = mongoose.model("Realtor", RealtorSchema);

module.exports = Realtors;
