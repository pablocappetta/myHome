const { BADRESP } = require("dns");
const {
  BadRequestError,
  ConflictError,
  InternalServerError,
  UnauthorizedError,
  NotFoundError,
} = require("../middlewares/errorHandler");
const RealtorModel = require("../models/Realtor");
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ValidationError = mongoose.Error.ValidationError;
const ReservationService = require("../services/reservation.service");
const ListingService = require("../services/listings.service");
const { find, findById } = require("../models/Listing");

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

  async getRealtorByLoginEmail(loginEmail) {
    try {
      const realtor = await RealtorModel.findOne({ loginEmail });
      realtor.password = undefined;
      return realtor;
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error en getRealtorByLoginEmail Service");
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
      if (listings.length > 0) {
        for (const listing of listings) {
          await ListingService.deleteListing(listing._id);
        }
      }

      // Use ReservationService to delete reservations and corresponding listings
      const reservations = await ReservationService.getReservationsByRealtorId(
        realtorId
      );
      if (reservations.length > 0) {
        for (const reservation of reservations) {
          await ReservationService.deleteReservation(reservation._id);
          await ListingService.deleteListing(reservation.listingId);
        }
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
      const realtor = await RealtorModel.findOneAndUpdate(
        { _id: realtorId },
        updatedRealtor,
        { new: true }
      );
      realtor.password = undefined;
      return realtor;
    } catch (err) {
      console.error(err);
      if (err instanceof ValidationError) {
        throw new BadRequestError("Error en validaciones de Mongoose.");
      }
      throw new InternalServerError("Error en updateRealtorById Service");
    }
  }

  async login(loginEmail, password) {
    try {
      const realtor = await RealtorModel.findOne({ loginEmail });
      if (!realtor) {
        throw new UnauthorizedError(
          "No existe realtor registrado con ese email"
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

  async passwordReset(loginEmail, password) {
    try {
      const realtor = await RealtorModel.findOne({ loginEmail });
      if (!realtor) {
        throw new UnauthorizedError(
          "No existe realtore registrado con ese email"
        );
      }
      realtor.password = await bcrypt.hash(password, 10);
      realtor.save();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async addNotification(realtorId, notification) {
    try {
      const realtor = await RealtorModel.findById(realtorId);
      if (!realtor) {
        throw new NotFoundError("Realtor not found");
      }

      realtor.notifications.push(notification);

      await realtor.save();

      return realtor.notifications;
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundError) {
        throw err;
      }
      if (err instanceof ValidationError) {
        throw new BadRequestError("Error en validaciones de Mongoose.");
      }
      throw new InternalServerError("Error in addNotification Service");
    }
  }

  async deleteNotification(realtorId, notificationId) {
    try {
      const realtor = await RealtorModel.findById(realtorId);
      if (!realtor) {
        throw new NotFoundError("Realtor not found");
      }

      const notification = realtor.notifications.id(notificationId);
      if (!notification) {
        throw new NotFoundError("Notification not found");
      }

      realtor.notifications.pull(notificationId);

      await realtor.save();

      return realtor.notifications;
    } catch (err) {
      console.error(err);
      if (err instanceof NotFoundError) {
        throw err;
      }
      throw new InternalServerError("Error in deleteNotification Service");
    }
  }

  async addReview(realtorId, review) {
    try {
      const user = await UserModel.findById(review.userId);
      const realtor = await this.getRealtorById(realtorId);
      if (!realtor) {
        throw new NotFoundError("Realtor not found");
      }
      if (!user) {
        throw new NotFoundError("User not found");
      }

      review.userId = undefined;
      review.user = {
        name: user.name,
        avatar: user.avatar,
      };

      realtor.reviews.push(review);

      await realtor.save();
    } catch (err) {
      console.error(err);
      throw new InternalServerError("Error in addReview Service");
    }
  }
}

module.exports = new RealtorService();
