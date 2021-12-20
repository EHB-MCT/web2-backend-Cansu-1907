const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
