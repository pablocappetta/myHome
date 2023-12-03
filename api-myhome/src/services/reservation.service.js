const {
  BadRequestError,
  ConflictError,
  InternalServerError,
  UnauthorizedError,
  NotFoundError,
} = require("../middlewares/errorHandler");
const ReservationModel = require("../models/Reservation");
const mongoose = require("mongoose");
const ValidationError = mongoose.Error.ValidationError;

class ReservationService {
  async createReservation(reservation) {
    try {
      return await ReservationModel.create(reservation);
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        throw new BadRequestError("Error en validaciones de Mongoose.");
      }
      throw new InternalServerError("Error en createReservation Service");
    }
  }

  async getReservationById(reservationId) {
    try {
      const reservation = await ReservationModel.findOne({
        _id: reservationId,
      });
      if (!reservation) {
        throw new NotFoundError("La reserva no existe");
      }
      return reservation;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en getReservationById Service");
    }
  }

  async getReservationsByUserId(userId) {
    try {
      return await ReservationModel.find({ userId });
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en getReservationsByUserId Service");
    }
  }

  async getReservationsByRealtorId(realtorId) {
    try {
      return await ReservationModel.find({ realtorId });
    } catch (err) {
      console.error(err);
      throw new InternalServerError(
        "Error en getReservationsByRealtorId Service"
      );
    }
  }

  async getReservationsByListingId(listingId) {
    try {
      return await ReservationModel.find({ listingId });
    } catch (err) {
      console.error(err);
      throw new InternalServerError(
        "Error en getReservationsByListingId Service"
      );
    }
  }

  async updateReservation(reservationId, reservation) {
    try {
      return await ReservationModel.findOneAndUpdate(
        { _id: reservationId },
        reservation,
        {
          new: true,
        }
      );
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        throw new BadRequestError("Error en validaciones de Mongoose.");
      }
      throw new InternalServerError("Error en updateReservation Service");
    }
  }

  async deleteReservation(reservationId) {
    try {
      return await ReservationModel.deleteOne({ _id: reservationId });
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en deleteReservation Service");
    }
  }

  async markAsReviewed(reservationId) {
    const reservation = await ReservationModel.findOne({ _id: reservationId });
    if (!reservation) {
      throw new NotFoundError("La reserva no existe");
    }
    reservation.wasReviewed = true;
    reservation.save();
  }
}

module.exports = new ReservationService();
