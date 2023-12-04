const { Router } = require("express");
const { check } = require("express-validator");
const RealtorController = require("../controllers/realtor.controller");
const checkFields = require("../middlewares/validateFields");
const checkJwt = require("../middlewares/jwtValidator");
const ImgurStorage = require("multer-storage-imgur");
const multer = require("multer");

const upload = multer({
  storage: ImgurStorage({ clientId: process.env.IMGUR_CLIENT_ID }),
});

const router = Router();

//Valida JWT del sessionStorage
router.post("/jwt", checkJwt);

//Crea un realtor
router.post("/", upload.single("logo"), RealtorController.createRealtor);

//Loguea un realtor
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
  upload.single("logo"),
  [
    check("realtorId", "El id del realtor es obligatorio").not().isEmpty(),
    checkFields,
  ],
  RealtorController.updateRealtor
);

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

module.exports = router;
