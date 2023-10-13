const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  last_name: String,
  email: String,
  password: String,
  role: String,
  avatar: String,
  google: Boolean,
  active: Boolean,
  phone: String,
  created_at: { type: Date, default: Date.now },
});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
