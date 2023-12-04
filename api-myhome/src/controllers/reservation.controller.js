let instance = null;
require("dotenv").config();
const ReservationService = require("../services/reservation.service");
const RealtorService = require("../services/realtor.service");
const ListingService = require("../services/listings.service");
const UserService = require("../services/users.service");
const { BadRequestError } = require("../middlewares/errorHandler");

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
      const reservations = await ReservationService.getReservationsByUserId(
        userId
      );

      // Obtener detalles de propiedades para cada reserva de manera sincrónica
      const reservationsWithDetails = [];
      for (const reservation of reservations) {
        const listingDetails = await ListingService.getListingById(
          reservation.listingId
        );
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
        const listingDetails = await ListingService.getListingById(
          reservation.listingId
        );
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

  async getReservationById(req, res, next) {
    const { reservationId } = req.params;
    try {
      const reservation = await ReservationService.getReservationById(
        reservationId
      );
      return res.status(200).json(reservation);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async createReservation(req, res, next) {
    const { body } = req;
    try {
      const listing = await ListingService.getListingById(body.listingId);
      if (!listing.status === "disponible") {
        throw new BadRequestError("La propiedad no esta disponible");
      }

      const reservation = await ReservationService.createReservation(body);

      await ListingService.markAsReserved(body.listingId);

      const user = await UserService.getUserById(reservation.userId);
      RealtorService.addNotification(reservation.realtorId, {
        message: `El usuario ${user.name} reservó ${listing.title} Contacto: ${user.email}`,
        listingId: reservation.listingId,
      });

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
      if (updatedReservation.status === "Cancelada") {
        await ListingService.markAsAvailable(updatedReservation.listingId);
      }
      return res.status(200).json(updatedReservation);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteReservation(req, res, next) {
    const { reservationId } = req.params;
    try {
      const reservation = await ReservationService.deleteReservation(
        reservationId
      );
      await ListingService.markAsAvailable(reservation.listingId);
      return res.status(204).json();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async reviewReservation(req, res, next) {
    try {
      const { reservationId } = req.params;
      const review = req.body;

      const reservation = await ReservationService.getReservationById(
        reservationId
      );

      if (reservation.wasReviewed) {
        return res
          .status(400)
          .json({ message: "La reserva ya fue calificada" });
      }

      review.userId = reservation.userId;

      await RealtorService.addReview(reservation.realtorId, review);
      await ReservationService.markAsReviewed(reservationId);
      return res.status(200).json();
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = ReservationController.getInstance();
