require("dotenv").config();
const express = require("express");
const { dbConnection } = require("./src/db/config");
const YAML = require("yamljs");
const path = require("path");
const app = express();
dbConnection();
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./swagger.yaml");

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//CORS
app.use(cors());

//Estilos del JSON
app.set("json spaces", 2);

/* Rutas */

//Raiz
app.use("/", express.static(path.join(__dirname, "./public")));

//Realtor endpoint
app.use("/api/realtors", require("./src/routes/realtor.routes"));

//Listings endpoint
app.use("/api/listings", require("./src/routes/listing.routes"));

//Usuarios endpoint
app.use("/api/users", require("./src/routes/user.routes"));

//Swagger endpoint
app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Error handling endpoints
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

//Listener y puerto
app.listen(process.env.PORT, () => {
  console.log("Puerto: " + process.env.PORT);
});

module.exports = app;
