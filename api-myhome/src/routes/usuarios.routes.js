const { Router } = require("express");
const { check } = require("express-validator");
const usuariosController = require("../controllers/usuarios.controller");
const checkFields = require("../middlewares/validateFields");
const checkJwt = require("../middlewares/jwtValidator");

const router = Router();

//Valida JWT del sessionStorage
router.post("/jwt", checkJwt);

//Devuelve todos los usuarios
router.get("/", usuariosController.getUsuarios); //GET USUARIOS

//Crea un usuario
router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("lastname").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  usuariosController.createUsuario
); //POST USUARIOS

//Devuelve un usuario por id
router.get("/:id", usuariosController.getUsuarioById); //GET USUARIOS BY ID

//Loguea un usuario
router.post(
  "/login",
  [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    checkFields,
  ],
  usuariosController.login
);

module.exports = router;
