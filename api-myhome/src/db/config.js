const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      dbName: "myHome-PROD",
    });
    console.log("La conexión con la BD se ha realizado correctamente.");
  } catch (err) {
    console.error(err);
    throw new Error("Error en la conexión de la BD");
  }
};

module.exports = { dbConnection };
