let instance = null;
require("dotenv").config();
const RealtorService = require("../services/realtor.service");
const ReservationService = require("../services/reservation.service");
const ListingService = require("../services/listings.service");
const jwt = require("jsonwebtoken");

class RealtorController {
  static getInstance() {
    if (!instance) {
      return new RealtorController();
    }
    return instance;
  }

  async getRealtors(req, res, next) {
    try {
      const realtors = await RealtorService.getRealtors();
      return res.status(200).json(realtors);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getRealtorById(req, res, next) {
    const { realtorId } = req.params;
    try {
      const realtor = await RealtorService.getRealtorById(realtorId);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async createRealtor(req, res, next) {
    const { body } = req;
    try {
      const realtor = await RealtorService.createRealtor(body);
      return res.status(201).json(realtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteRealtor(req, res, next) {
    const { id } = req.params;
    try {
      // Eliminar listados del agente
      await ListingModel.deleteMany({ realtorId: id });
  
      // Obtener reservas del agente
      const reservations = await ReservationModel.find({ realtorId: id });
  
      // Eliminar cada reserva y su correspondiente listado
      for (const reservation of reservations) {
        await ReservationModel.deleteOne({ _id: reservation._id });
        await ListingModel.deleteOne({ _id: reservation.listingId });
      }
      
      // Eliminar agente inmobiliario
      await RealtorModel.deleteOne({ _id: id });
  
    } catch (err) {
      console.error(err);
      throw new Error("Error en deleteRealtor Service");
    }
  }
  
  async updateRealtor(req, res, next) {
    const { realtorId } = req.params;
    const realtor = req.body;
    try {
      const updatedRealtor = await RealtorService.updateRealtor(
        realtorId,
        realtor
      );
      return res.status(200).json(updatedRealtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getRealtorByToken(req, res, next) {
    const { token } = req;
    try {
      const realtor = await RealtorService.getRealtorByToken(token);
      return res.status(200).json(realtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const realtor = await RealtorService.login(
        req.body.email,
        req.body.password
      );
      const token = jwt.sign(realtor.toJSON(), process.env.PRIVATE_KEY, {
        expiresIn: "1d",
      });
      return res.status(200).json({ token: token, data: realtor });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async addReview(req, res, next) {
    const { realtorId } = req.params;
    const review = req.body;

    try {
      const updatedRealtor = await RealtorService.addReview(realtorId, review);
      return res.status(200).json(updatedRealtor);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = RealtorController.getInstance();
