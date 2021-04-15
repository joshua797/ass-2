const { static } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userController {
  static async getUser(req, res) {
    const x = await User.find({});
    res.status(200).send(x);
  }

  static createUser(req, res) {
    // register
    if (!req.body) return res.sendStatus(404);
    const newUser = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8), // ini buat enkripsi passsword register
      barrack: req.body.barrack,
      medal: req.body.medal,
      gold: 100,
      food: 100,
      soldier: req.body.soldier,
    };

    try {
      User.create(newUser);
      res.send(201).json("Create user");
    } catch (err) {
      res.status(404);
    }
  }

  static findAllUsers(req, res) {
    Student.find()
      .populate("users")
      .then((result) => {
        if (result.length > 0) {
          res
            .status(200)
            .json({ message: "berhasil find all data student", data: result });
        } else {
          res.status(404).json({ message: "not found all data student" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "gagal find all data student" });
      });
  }

  static deleteUser(req, res) {
    const { id } = req.params;
    User.findByIdAndDelete(id)
      .then((result) => {
        res
          .status(200)
          .json({ message: "Data student berhasil dihapus", data: result });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: " data student gagal dihapus", data: err });
      });
  }

  static updateUser(req, res) {
    const { id } = req.params;
    const { email, password, barrack, medal, gold, food, soldier } = req.body;

    const updatedData = {
      email,
      password,
      barrack,
      medal,
      gold,
      food,
      soldier,
    };

    for (const key in updatedData) {
      if (!updatedData[key]) {
        delete updatedData[key];
      }
    }
    User.findByIdAndUpdate(id, updatedData, { new: true })
      .then((result) => {
        res
          .status(200)
          .json({ message: "Data User berhasil diupdate", data: result });
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: " data user gagal diupdate", data: err });
      });
  }

  static loginUser(req, res) {
    User.findOne({ email: req.body.email })
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            success: false,
            message: "Lah ya Mak Email/Pass salah tuh",
          });
        }
        var passwordIsvalid = bcrypt.compareSync(
          req.body.password,
          result.password
        );
        if (!passwordIsvalid) {
          return res.status(301).json({
            success: false,
            message: "Lah ya Mak Email/Pass salah tuh",
          });
        }
        var token = jwt.sign({ id: result.id }, process.env.SECRET_KEY, {
          expiresIn: "1H",
        });
        console.log(token);
        res.status(202).json({
          message: "berhasil login",
          data: result,
          AccessToken: token,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Gagal", err });
      });
  }
}

module.exports = userController;
