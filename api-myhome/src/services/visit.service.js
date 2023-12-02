const mongoose = require("mongoose");
const ValidationError = mongoose.Error.ValidationError;
const VisitModel = require("../models/Visit");
const {
    BadRequestError,
    InternalServerError,
  } = require("../middlewares/errorHandler");

class VisitService {
    async createVisit(visitData) {
        try {
            const visit = new VisitModel(visitData);
            const createdVisit = await visit.save();
            return createdVisit;
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new BadRequestError("Error en validaciones de Mongoose.");
            }
            throw error;
        }
    }

    async updateVisit(visitId, visitData) {
        try {
            const updatedVisit = await VisitModel.findByIdAndUpdate(
                visitId,
                visitData,
                { new: true }
            );
            return updatedVisit;
        } catch (err) {
            console.error(err);
            throw new InternalServerError("Error en updateVisit Service");
          }
    }

    async getVisitById(visitId) {
        try {
            const visit = await VisitModel.findById(visitId);
            return visit;
        } catch (err) {
            console.error(err);
            throw new InternalServerError("Error en getVisitById Service");
          }
    }

    async deleteVisit(visitId) {
        try {
            await VisitModel.findByIdAndDelete(visitId);
        } catch (err) {
            console.error(err);
            throw new InternalServerError("Error en deleteVisit Service");
          }
    }
}

module.exports = new VisitService();
