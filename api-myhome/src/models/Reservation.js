const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const reservationSchema = new mongoose.Schema(
  {
    listingId: {
      type: ObjectId,
      ref: "Listing",
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    reservationDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pendiente", "Pagada", "Cancelada"],
      default: "Pendiente",
      required: true,
    },
    wasReviewed: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { versionKey: false }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
