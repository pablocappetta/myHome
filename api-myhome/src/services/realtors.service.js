const RealtorModel = require("../models/realtor.model");
const bcrypt = require("bcrypt");

class RealtorService {
  async getRealtors() {
    try {
      const realtors = await RealtorModel.find();
      return realtors;
    } catch (err) {
      console.error(err);
      throw new Error("Error en getRealtors Service");
    }
  }

  async getRealtorById(id) {
    try {
      const realtor = await RealtorModel.findOne({ _id: id });
      return realtor;
    } catch (err) {
      console.error(err);
      throw new Error("Error en getRealtorById Service");
    }
  }

  async getRealtorsByLoginEmail(loginEmail) {
    try {
      const realtor = await RealtorModel.findOne({ loginEmail });
      return realtor;
    } catch {
      console.error(err);
      throw new Error("Error en getRealtorByLoginEmail Service");
    }
  }

  async createRealtor(realtor) {
    const isRealtorRegistered = await this.getRealtorsByLoginEmail(
      realtor.loginEmail
    );
    if (isRealtorRegistered) {
      throw new Error("El realtor ya existe");
    }
    try {
      realtor.password = await bcrypt.hash(realtor.password, 10);
      return await RealtorModel.create(realtor);
    } catch (err) {
      console.error(err);
      throw new Error("Error en createRealtor Service");
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
      throw new Error("Error en updateRealtor Service");
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

  async login(loginEmail, password) {
    // TODO: esto creo que va en otro service?
  }
}
