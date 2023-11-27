let instance = null;
require("dotenv").config();
const ReservationService = require("../services/reservation.service");
const ListingService = require("../services/listings.service");

class ReservationController {
  static getInstance() {
    if (!instance) {
      return new ReservationController();
    }
    return instance;
  }

  async getReservationsByUserId(req, res, next) {
    const { userId } = req.params;
    try {
      const reservations = await ReservationService.getReservationsByUserId(userId);
  
      // Obtener detalles de propiedades para cada reserva de manera sincrónica
      const reservationsWithDetails = [];
      for (const reservation of reservations) {
        const listingDetails = await ListingService.getListingById(reservation.listingId);
        reservationsWithDetails.push({ ...reservation._doc, listingDetails });
      }
  
      return res.status(200).json(reservationsWithDetails);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getReservationsByRealtorId(req, res, next) {
    const { realtorId } = req.params;
    try {
      const reservations = await ReservationService.getReservationsByRealtorId(
        realtorId
      );
      const reservationsWithDetails = [];
      for (const reservation of reservations) {
        const listingDetails = await ListingService.getListingById(reservation.listingId);
        reservationsWithDetails.push({ ...reservation._doc, listingDetails });
      }
  
      return res.status(200).json(reservationsWithDetails);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getReservationsByListingId(req, res, next) {
    const { listingId } = req.params;
    try {
      const reservations = await ReservationService.getReservationsByListingId(
        listingId
      );
      return res.status(200).json(reservations);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async createReservation(req, res, next) {
    const { body } = req;
    try {
      const reservation = await ReservationService.createReservation(body);
      return res.status(201).json(reservation);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async updateReservation(req, res, next) {
    const { reservationId } = req.params;
    const reservation = req.body;
    try {
      const updatedReservation = await ReservationService.updateReservation(
        reservationId,
        reservation
      );
      return res.status(200).json(updatedReservation);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteReservation(req, res, next) {
    const { reservationId } = req.params;
    try {
      await ReservationService.deleteReservation(reservationId);
      return res.status(204).json();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = ReservationController.getInstance();
