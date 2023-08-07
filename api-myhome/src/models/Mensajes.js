const mongoose = require("mongoose");

const MensajesSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  telefono: String,
  mensaje: String,
});

const Mensajes = mongoose.model("Mensajes", MensajesSchema);

module.exports = Mensajes;
