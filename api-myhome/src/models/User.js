const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    avatar: String,
    phone: String,
    creationDate: { type: Date, default: Date.now },
    __v: { type: Number, select: false, create: false },
  },
  { versionKey: false }
);

const Users = mongoose.model("User", UserSchema);

module.exports = Users;
