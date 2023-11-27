const {
    InternalServerError,
    BadRequestError,
  } = require("../middlewares/errorHandler");
  const NotificationModel = require("../models/Notification");
  const mongoose = require("mongoose");


  