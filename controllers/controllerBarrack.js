const { static } = require("express");
const Barrack = require("../models/Barrack");

class barrackController {
  static async getBarrack(req, res) {
    const x = await Barrack.find({});
    res.status(200).send(x);
  }

  static createBarrack(req, res) {
    if (!req.body) return res.sendStatus(404);
    const newBarrack = {
      nama: req.body.nama,
    };

    try {
      Barrack.create(newBarrack);
      res.send(201).json("Created Barrack");
    } catch (err) {
      res.status(404);
    }
  }
  static deleteBarrack(req, res) {
    const { id } = req.params;
    Market.findByIdAndDelete(id)
      .then((result) => {
        res.status(200).json({ message: "Barrack didelete", data: result });
      })
      .catch((err) => {
        res.status(500).json({ message: " Barrack gagal didelete", data: err });
      });
  }

  static updateBarrack(req, res) {
    const { id } = req.params;
    const { nama, gold } = req.body;

    const updatedData = { nama, gold }; // not Gold

    for (const key in updatedData) {
      if (!updatedData[key]) {
        delete updatedData[key];
      }
    }
    Barrack.findByIdAndUpdate(id, updatedData, { new: true })
      .then((result) => {
        res
          .status(200)
          .json({ message: "Barrack berhasil dihapus", data: result });
      })
      .catch((err) => {
        res.status(500).json({ message: " Barrack gagal dihapus", data: err });
      });
  }
}

module.exports = barrackController;
