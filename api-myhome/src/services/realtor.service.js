const { BADRESP } = require("dns");
const {
  BadRequestError,
  ConflictError,
  InternalServerError,
  UnauthorizedError,
} = require("../middlewares/errorHandler");
const RealtorModel = require("../models/Realtor");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ValidationError = mongoose.Error.ValidationError;
const ReservationService = require("../services/reservation.service");
const ListingService = require("../services/listings.service");

class RealtorService {
  async getRealtors() {
    try {
      const realtors = await RealtorModel.find();
      return realtors;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en getRealtors Service");
    }
  }

  async getRealtorById(id) {
    try {
      const realtor = await RealtorModel.findOne({ _id: id });
      realtor.password = undefined;
      return realtor;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en getRealtorById Service");
    }
  }

  async isRealtorRegistered(loginEmail) {
    try {
      const realtor = await RealtorModel.findOne({ loginEmail });
      return !!realtor;
    } catch {
      console.error(err);
      throw new InternalServerError("Error en isRealtorRegistered Service");
    }
  }

  async createRealtor(realtor) {
    const isRealtorRegistered = await this.isRealtorRegistered(
      realtor.loginEmail
    );
    if (isRealtorRegistered) {
      throw new ConflictError("El realtor ya existe");
    }
    try {
      realtor.password = await bcrypt.hash(realtor.password, 10);
      const createdRealtor = await RealtorModel.create(realtor);
      createdRealtor.password = undefined;
      return createdRealtor;
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        throw new BadRequestError("Error en validaciones de Mongoose.");
      }
      throw new InternalServerError("Error en createUser Service");
    }
  }

  async deleteRealtor(realtorId) {
    try {
      // Use ListingService to delete listings
      const listings = await ListingService.getListingsByRealtorId(realtorId);
      for (const listing of listings) {
        await ListingService.deleteListing(listing._id);
      }

      // Use ReservationService to delete reservations and corresponding listings
      const reservations = await ReservationService.getReservationsByRealtorId(
        realtorId
      );
      for (const reservation of reservations) {
        await ReservationService.deleteReservation(reservation._id);
        await ListingService.deleteListing(reservation.listingId);
      }

      // Use RealtorService to delete the realtor
      await RealtorModel.deleteOne({ _id: realtorId });
    } catch (err) {
      console.error(err);
      throw new Error("Error en deleteRealtor Service");
    }
  }

  async updateRealtor(realtorId, updatedRealtor) {
    try {
      return await RealtorModel.findOneAndUpdate(
        { _id: realtorId },
        updatedRealtor,
        { new: true }
      );
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        throw new BadRequestError("Error en validaciones de Mongoose.");
      }
      throw new InternalServerError("Error en updateRealtorById Service");
    }
  }

  async updateRealtorPassword(realtorId, password) {
    try {
      const updatedRealtor = await RealtorModel.findOneAndUpdate(
        { _id: realtorId },
        { password },
        { new: true }
      );
      updatedRealtor.password = undefined;
      return updatedRealtor;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en updateRealtorPassword Service");
    }
  }

  async login(loginEmail, password) {
    try {
      const realtor = await RealtorModel.findOne({ loginEmail });
      if (!realtor) {
        throw new UnauthorizedError(
          "No existe realtore registrado con ese email"
        );
      }
      const isPasswordOk = await bcrypt.compare(password, realtor.password);

      if (!isPasswordOk) {
        throw new UnauthorizedError("Contraseña incorrecta");
      }

      realtor.password = undefined;
      return realtor;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async sendMessage(realtorId, message) {
    // TODO:
  }

  async addReview(realtorId, review) {
    try {
      const realtor = await RealtorModel.findById(realtorId);
      if (!realtor) {
        throw new Error("Realtor not found");
      }

      const newReview = {
        date: new Date(),
        rating: review.rating,
        comment: review.comment,
        userId: review.userId,
      };

      realtor.reviews.push(newReview);

      await realtor.save();

      return realtor;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error in addReview Service");
    }
  }

  async getRealtorByLoginEmail(loginEmail) {
    const realtor = await RealtorModel.findOne({ loginEmail });
    if (!realtor) {
      throw new Error("Realtor not found");
    }
    return realtor;
  }
}

module.exports = new RealtorService();
