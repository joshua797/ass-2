const { static } = require("express");
const Market = require("../models/Market");

class marketController {
  static async getMarket(req, res) {
    const x = await Market.find({});
    res.status(200).send(x);
  }

  static createMarket(req, res) {
    if (!req.body) return res.sendStatus(404);
    const newMarket = {
      nama: req.body.nama,
    };

    try {
      Market.create(newMarket);
      res.send(201).json("Create Market");
    } catch (err) {
      res.status(404);
    }
  }
  static deleteMarket(req, res) {
    const { id } = req.params;
    Market.findByIdAndDelete(id)
      .then((result) => {
        res.status(200).json({ message: "Market didelete", data: result });
      })
      .catch((err) => {
        res.status(500).json({ message: " Market gagal dihapus", data: err });
      });
  }

  static updateMarket(req, res) {
    const { id } = req.params;
    const { nama, gold } = req.body;

    const updatedData = { nama, gold };

    for (const key in updatedData) {
      if (!updatedData[key]) {
        delete updatedData[key];
      }
    }
    Market.findByIdAndUpdate(id, updatedData, { new: true })
      .then((result) => {
        res
          .status(200)
          .json({ message: "Market berhasil dihapus", data: result });
      })
      .catch((err) => {
        res.status(500).json({ message: " Market gagal dihapus", data: err });
      });
  }
}

module.exports = marketController;
