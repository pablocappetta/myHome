const { Router } = require("express");
const mensajesController = require("../controllers/mensajes.controller");
const checkFields = require("../middlewares/validateFields");
const { check } = require("express-validator");

const router = Router();

router.get("/", mensajesController.getMessages); //GET MENSAJES
router.get("/:id", mensajesController.getMessageById); //GET MENSAJES BY ID

router.post(
  "/",
  [
    check("nombre").not().isEmpty(),
    check("apellido").not().isEmpty(),
    check("email").not().isEmpty(),
    check("telefono").not().isEmpty(),
    check("mensaje").not().isEmpty(),
    checkFields,
  ],
  mensajesController.createMessage
); //POST MENSAJES

router.delete("/:id", mensajesController.deleteMessage); //DELETE MENSAJES

module.exports = router;
