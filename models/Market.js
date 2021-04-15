const mongoose = require("mongoose");
const { type } = require("os");

const market = new mongoose.Schema({
  nama: { type: String },
  gold: { type: Number, maximum: 20 },
});

module.exports = Market = mongoose.model("clashofclanmarket", market);
