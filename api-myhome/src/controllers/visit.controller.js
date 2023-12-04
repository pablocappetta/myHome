let instance = null;
require("dotenv").config();
const realtorService = require("../services/realtor.service");
const VisitService = require("../services/visit.service");
const ListingService = require("../services/listings.service");
const UserService = require("../services/users.service");
const nodemailer = require("nodemailer");
const { NotFoundError } = require("../middlewares/errorHandler");

class VisitController {
  static getInstance() {
    if (!instance) {
      return new VisitController();
    }
    return instance;
  }

  async createVisit(req, res, next) {
    try {
      const listingId = req.params.listingId;
      const { body } = req;
      body.listingId = listingId;

      const user = await UserService.getUserById(body.userId);
      const listing = await ListingService.getListingById(body.listingId);

      if (!user || !listing) {
        throw new NotFoundError("User or listing not found");
      }

      const visit = await VisitService.createVisit(body);

      const date = new Date(visit.date).toLocaleDateString();
      realtorService.addNotification(listing.realtorId, {
        message: `El usuario ${user.name} programó una visita: Fecha: ${date} Turno: ${visit.time} Contacto: ${user.email}`,
      });

      const transporter = nodemailer.createTransport({
        service: "Outlook",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "myHome - Nueva visita programada",
        html: `
        <p>¡Hola, ${user.name}!</p>
        <p>Has programado una visita:</p>
        <p>Fecha: <b>${date}</b></p>
        <p>Turno: <b>${visit.time}</b></p>
        
        <p>Saludos,</p>
        <b>El equipo de myHome</b>
        `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });

      return res.status(201).json(visit);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async getVisitsByListingId(req, res) {
    try {
      const { listingId } = req.params;
      const visit = await VisitService.getVisitsByListingId(listingId);
      if (!visit) {
        res.status(404).json({ error: "Visit not found" });
      } else {
        res.status(200).json(visit);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateVisit(req, res) {
    try {
      const visitId = req.params.visitId;
      const visit = await VisitService.updateVisit(visitId, req.body);
      if (!visit) {
        res.status(404).json({ error: "Visit not found" });
      } else {
        res.status(200).json(visit);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteVisit(req, res) {
    try {
      const visitId = req.params.visitId;
      console.log(visitId);
      const visit = await VisitService.deleteVisit(visitId);
      if (!visit) {
        res.status(404).json({ error: "Visit not found" });
      } else {
        res.status(200).json({ message: "Visit deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = VisitController.getInstance();
