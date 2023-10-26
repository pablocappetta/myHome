const mongoose = require("mongoose");
const { Schema } = mongoose;

const RealtorSchema = new Schema({
  name: String,
  loginEmail: String,
  password: String,
  contactEmail: String,
  logo: String,
  reviews: [
    {
      date: Date,
      rating: mongoose.Schema.Types.Decimal128,
      comment: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    },
  ],
  created_at: { type: Date, default: Date.now },
});

const Realtors = mongoose.model("realtors", RealtorSchema);

module.exports = Realtors;
