const mongoose = require("mongoose");

const { Schema } = mongoose;

const villageSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  villageName: String,
  villagers: Object,
  furniture: Object,
  wallFurniture: Object,
  fishes: Object,
  bugs: Object,
  sea: Object,
  fossils: Object,
});

module.exports = mongoose.model("Village", villageSchema);
