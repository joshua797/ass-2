const mongoose = require("mongoose");
const { type } = require("os");

const farm = new mongoose.Schema({
  nama: { type: String },
  food: { type: Number, maximum: 20 },
});
module.exports = Farm = mongoose.model("clashofclanfarm", farm);
