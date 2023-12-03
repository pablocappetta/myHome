const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
      },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      enum: ["Mañana", "Tarde"],
      required: true,
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Visits = mongoose.model("Visit", visitSchema);

module.exports = Visits;
