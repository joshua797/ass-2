const mongoose = require("mongoose");
const { type } = require("os");

const barrack = new mongoose.Schema({
  nama: { type: String },
  soldier: { type: Number, maximum: 10 },
});

module.exports = Barrack = mongoose.model("clashofclanbarrack", barrack);
