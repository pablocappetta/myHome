const { Router } = require("express");
const { check } = require("express-validator");
const ReservationController = require("../controllers/reservation.controller");
const checkFields = require("../middlewares/validateFields");
const checkJwt = require("../middlewares/jwtValidator");

const router = Router();

//Crea una reserva
router.post(
  "/",
  [
    checkJwt,
    check("listingId", "El id de la propiedad es obligatorio").not().isEmpty(),
    check("realtorId", "El id del agente es obligatorio").not().isEmpty(),
    check("userId", "El id del usuario es obligatorio").not().isEmpty(),
    check("date", "La fecha de la reserva es obligatoria").not().isEmpty(),
    check("time", "La hora de la reserva es obligatoria").not().isEmpty(),
    check("status", "El estado de la reserva es obligatorio").not().isEmpty(),
    checkFields,
  ],
  ReservationController.createReservation
);

//Obtiene las reservas de un usuario
router.get(
  "/user/:userId",
  [
    checkJwt,
    check("userId", "El id del usuario es obligatorio").not().isEmpty(),
    checkFields,
  ],
  ReservationController.getReservationsByUserId
);

//Obtiene las reservas de un agente
router.get(
  "/realtor/:realtorId",
  [
    checkJwt,
    check("realtorId", "El id del agente es obligatorio").not().isEmpty(),
    checkFields,
  ],
  ReservationController.getReservationsByRealtorId
);

//Obtiene las reservas de una propiedad
router.get(
  "/listing/:listingId",
  [
    checkJwt,
    check("listingId", "El id de la propiedad es obligatorio").not().isEmpty(),
    checkFields,
  ],
  ReservationController.getReservationsByListingId
);

//Actualiza una reserva
router.put(
  "/:reservationId",
  [
    check("reservationId", "El id de la reserva es obligatorio")
      .not()
      .isEmpty(),
    checkFields,
  ],
  ReservationController.updateReservation
);

//Borra una reserva
router.delete(
  "/:reservationId",
  [
    checkJwt,
    check("reservationId", "El id de la reserva es obligatorio")
      .not()
      .isEmpty(),
    checkFields,
  ],
  ReservationController.deleteReservation
);

module.exports = router;
