const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const { type } = require("os");

const user = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  barrack: { type: Number, maximum: 30 },
  medal: { type: Number },
  gold: { type: Number, maximum: 1000 },
  food: { type: Number, maximum: 1000 },
  soldier: { type: Number, maximum: 500 },
});
module.exports = User = mongoose.model("clashofclan", user);
