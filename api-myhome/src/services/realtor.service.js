const RealtorModel = require("../models/Realtor");
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

  async getRealtorByLoginEmail(loginEmail) {
    try {
      const realtor = await RealtorModel.findOne({ loginEmail });
      return realtor;
    } catch {
      console.error(err);
      throw new Error("Error en getRealtorByLoginEmail Service");
    }
  }

  async createRealtor(realtor) {
    const isRealtorRegistered = await this.getRealtorByLoginEmail(
      realtor.loginEmail
    );
    if (isRealtorRegistered) {
      throw new Error("El realtor ya existe");
    }
    try {
      realtor.password = await bcrypt.hash(realtor.password, 10);
      const createdRealtor = await RealtorModel.create(realtor);
      createdRealtor.password = undefined;
      return createdRealtor;
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

  async login(loginEmail, password) {
    try {
      const realtor = await this.getRealtorByLoginEmail(loginEmail);
      if (!realtor) {
        throw new Error("Unauthorized.");
      }
      const isPasswordOk = await bcrypt.compare(password, realtor.password);
      if (!isPasswordOk) {
        throw new Error("Unauthorized.");
      }
      realtor.password = undefined;
      return realtor;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getRealtorById(id) {
    try {
      return await RealtorModel.findOne({ _id: id });
    } catch (err) {
      console.error(err);
      throw new Error("Error en getRealtorById Service");
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
