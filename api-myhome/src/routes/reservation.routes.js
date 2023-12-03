const { Router } = require("express");
const { check } = require("express-validator");
const ReservationController = require("../controllers/reservation.controller");
const RealtorController = require("../controllers/realtor.controller");
const checkFields = require("../middlewares/validateFields");
const checkJwt = require("../middlewares/jwtValidator");

const router = Router();

//Crea una reserva
router.post(
  "/",
  [
    check("listingId", "El id de la propiedad es obligatorio").not().isEmpty(),
    check("realtorId", "El id del agente es obligatorio").not().isEmpty(),
    check("userId", "El id del usuario es obligatorio").not().isEmpty(),
    checkFields,
  ],
  ReservationController.createReservation
);

//Obtiene una reserva por id
router.get(
  "/:reservationId",
  [
    check("reservationId", "El id de la reserva es obligatorio")
      .not()
      .isEmpty(),
    checkFields,
  ],
  ReservationController.getReservationById
);

//Obtiene las reservas de un usuario
router.get(
  "/user/:userId",
  [
    check("userId", "El id del usuario es obligatorio").not().isEmpty(),
    checkFields,
  ],
  ReservationController.getReservationsByUserId
);

//Obtiene las reservas de un agente
router.get(
  "/realtor/:realtorId",
  [
    check("realtorId", "El id del agente es obligatorio").not().isEmpty(),
    checkFields,
  ],
  ReservationController.getReservationsByRealtorId
);

//Obtiene las reservas de una propiedad
router.get(
  "/listing/:listingId",
  [
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
    check("reservationId", "El id de la reserva es obligatorio")
      .not()
      .isEmpty(),
    checkFields,
  ],
  ReservationController.deleteReservation
);

//Agrega la review de una reserva
router.post(
  "/:reservationId/review",
  [
    check("reservationId", "El id de la reserva es obligatorio")
      .not()
      .isEmpty(),
    checkFields,
  ],
  ReservationController.reviewReservation
);

module.exports = router;
