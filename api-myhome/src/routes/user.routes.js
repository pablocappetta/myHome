const { Router } = require("express");
const { check } = require("express-validator");
const UserController = require("../controllers/user.controller");
const checkFields = require("../middlewares/validateFields");
const checkJwt = require("../middlewares/jwtValidator");

const router = Router();

//Valida JWT del sessionStorage
router.post("/jwt", checkJwt);

//Devuelve todos los usuarios
router.get("/", UserController.getUsers); //GET USUARIOS

//Loguea usuario. Si no lo existe lo crea y loguea
router.post("/login", UserController.googleLogin);

//Devuelve un usuario por id
router.get("/:id", UserController.getUserById); //GET USUARIOS BY ID

//Elimina un usuario por id
router.delete("/:id", UserController.deleteUser);

// Devuelve favoritos del usuario
router.get("/:id/favorites", UserController.getUserFavorites);

// Añade favorito
router.post("/:id/favorites/:listingId", UserController.addFavorite);

// Borra favorito
router.delete("/:id/favorites/:listingId", UserController.removeFavorite);

module.exports = router;
