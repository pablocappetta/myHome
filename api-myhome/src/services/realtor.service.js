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
      return realtor;
    } catch {
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

  async deleteRealtor(id) {
    try {
      await RealtorModel.deleteOne({ _id: id });
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

  async passwordReset(realtorId) {
    // TODO:
  }
}

module.exports = new RealtorService();
