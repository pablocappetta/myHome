const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ReservationSchema = new mongoose.Schema(
  {
    reservationId: {
      type: ObjectId,
      required: true,
    },
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
    realtorId: {
      type: ObjectId,
      ref: "Realtor",
      required: true,
    },
    reservationStartDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    reservationEndDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pendiente", "Pagada", "Cancelada"],
      default: "Pendiente",
      required: true,
    },
  },
  { versionKey: false }
);

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = Reservation;
