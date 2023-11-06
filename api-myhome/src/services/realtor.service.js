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

  async updateRealtor(realtor) {
    try {
      return await RealtorModel.findOneAndUpdate(
        { _id: realtor._id },
        realtor,
        { new: true }
      );
    } catch {
      console.error(err);
      if (err instanceof ValidationError) {
        throw new BadRequestError("Error en validaciones de Mongoose.");
      }
      throw new InternalServerError("Error en createUser Service");
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
    // TODO:
  }

  async passwordReset(realtorId) {
    // TODO:
  }
}

module.exports = new RealtorService();
