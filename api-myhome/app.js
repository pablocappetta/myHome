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
const http = require("http");
const https = require("https");
const fs = require("fs");
const { handleError } = require("./src/middlewares/errorHandler");

const isLocal = process.env.NODE_ENV === "local";

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(handleError);

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

//Reservas endpoint
app.use("/api/reservations", require("./src/routes/reservation.routes"));

//Swagger endpoint
app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Error handling endpoint. Tiene que estar ultimo en la cadena de middlewares
app.use(handleError);

app.use((req, res, next) => {
  res.status(404).send({ code: 404, message: "Path Not Found" });
});

if (!isLocal) {
  https
    .createServer(
      {
        key: fs.readFileSync("key.pem"),
        cert: fs.readFileSync("cert.pem"),
      },
      app
    )
    .listen(process.env.PORT, () => {
      console.log(`Secured server running on port ${process.env.PORT}`);
    });
} else {
  http.createServer(app).listen(process.env.PORT, () => {
    console.log(`Non-secure server running on port ${process.env.PORT}`);
  });
}

module.exports = app;
