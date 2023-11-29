const { Router } = require("express");
const { check } = require("express-validator");
const RealtorController = require("../controllers/realtor.controller");
const checkFields = require("../middlewares/validateFields");
const checkJwt = require("../middlewares/jwtValidator");

const router = Router();

//Valida JWT del sessionStorage
router.post("/jwt", checkJwt);

//Crea un usuario
router.post("/", RealtorController.createRealtor); //POST USUARIOS

//Loguea un usuario
router.post(
  "/login",
  [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  RealtorController.login
);

//Restablece la contraseña de un usuario
router.post(
  "/password-reset",
  [check("email").not().isEmpty(), checkFields],
  RealtorController.passwordResetStart
);

//Restablece la contraseña de un usuario
router.post(
  "/password-reset/:token",
  [
    check("token").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  RealtorController.passwordResetEnd
);

//agrega una notificacion de un realtor
router.post(
  "/:realtorId/notifications",
  [check("realtorId").not().isEmpty(), checkFields],
  RealtorController.addNotification
);

//elimina una notificacion de un realtor
router.delete(
  "/:realtorId/notifications/:notificationId",
  [
    check("realtorId").not().isEmpty(),
    check("notificationId").not().isEmpty(),
    checkFields,
  ],
  RealtorController.deleteNotification
);

//Actualiza un realtor
router.put(
  "/:realtorId",
  [
    check("realtorId", "El id del realtor es obligatorio").not().isEmpty(),
    checkFields,
  ],
  RealtorController.updateRealtor
);

// ESTO LO COMENTO PORQUE NO ESTA ANDANDO. atte Mateo
// //Cambia el logo del realtor
// router.post(
//   "/:realtorId/images",
//   upload.array("image", 10),
//   RealtorController.changeRealtorLogo
// );

// Borra un realtor, listings y reservas
router.delete(
  "/:realtorId",
  [
    check("realtorId", "El id del realtor es obligatorio").not().isEmpty(),
    checkFields,
  ],
  RealtorController.deleteRealtor
);

//Obtiene detalles del realtor por id
router.get("/:realtorId", RealtorController.getRealtorById);

// Agrega review a realtor (post reserva)
router.post(
  "/:realtorId/reviews",
  [
    check("rating").not().isEmpty(),
    check("comment").not().isEmpty(),
    check("userId").not().isEmpty(),
    checkFields,
  ],
  RealtorController.addReview
);

module.exports = router;
