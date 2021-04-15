const Student = require("../models/Student");
const Grade = require("../models/Grade");
const bcrypt = require ("bcrypt")
const jwt = require("jsonwebtoken")


class controller {
    static createStudent (req, res) {
        // const { fullname, email, password, telp } = req.body;
      
        Student.create({
          fullname: req.body.fullname,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          telp: req.body.telp
        })
          .then((result) => {
            res
              .status(201)
              .json({ message: "data Student berhasil dibuat", data: result });
          })
          .catch((err) => {
            res.status(500).json({ message: "Data gagal dibuat", data: err });
          });
    }
    static findAllStudent  (req, res) {
        Student.find()
        .populate("grades")
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
    static GetStudentId (req, res)  {
        const { id } = req.params;
      
        Student.findById(id)
          .then((result) => {
            res.status(200).json({
              message: "berhasil find specific data student",
              data: result,
            });
          })
          .catch((err) => {
            res.status(500).json({ message: "gagal find specific data student" });
          });
    }
    static updateStudent  (req, res)  {
        const { id } = req.params;
        const { fullname, email, telp } = req.body;
      
        const updatedData = { fullname, email, telp };
      
        for (const key in updatedData) {
          if (!updatedData[key]) {
            delete updatedData[key];
          }
        }
      
        Student.findByIdAndUpdate(id, updatedData, { new: true })
          .then((result) => {
            res
              .status(200)
              .json({ message: "berhasil update data student", data: result });
          })
          .catch((err) => {
            res.status(500).json({ message: "gagal update data student", data: err });
          });
    }
    static deleteStudent (req, res) {
        const { id } = req.params;
      
        Student.findByIdAndDelete(id)
          .then((result) => {
            res
              .status(200)
              .json({ message: "data student berhasil dihapus", data: result });
          })
          .catch((err) => {
            res
              .status(500)
              .json({ message: "data student gagal dihapus", data: err });
          });
    }
    
    static patchGrade (req, res) {
        const { id } = req.params;
        const { grades } = req.body;
      
        Student.findByIdAndUpdate(id, { $push: { grades: req.body.grades } }, { new: true })
          .then((result) => {
            res
              .status(200)
              .json({ message: "berhasil patch data student", data: result });
          })
          .catch((err) => {
            res.status(500).json({ message: "gagal patch data student", data: err });
          });
      }

    static postGrade  (req, res)  {
        const { gradename, score } = req.body;
      
        Grade.create({
          gradename,
          score,
        })
          .then((result) => {
            res
              .status(201)
              .json({ message: "data Grade berhasil dibuat", data: result });
          })
          .catch((err) => {
            res.status(500).json({ message: "Data Grade gagal dibuat", data: err.errors.score.message });
          });
    }

    static loginStudent (req,res) {
        Student.findOne({email:req.body.email})
        .then((result)=>{
            if(!result){
                return res.status(401).json({success:false, message:"kombinasi email dan password tidak ditemukan"})
            }
            var passwordIsValid = bcrypt.compareSync(req.body.password, result.password)
            if(!passwordIsValid){
                return res.status(401).json({success:false, message:"kombinasi email dan password tidak ditemukan"})
            }
            var token = jwt.sign({id:result.id}, process.env.secretKey, { expiresIn: '1h' })
            res.status(200).json({message:"berhasil login", data:result, AccessToken: token})
        })
        .catch((err) => {
            res.status(500).json({ message: "", err });
        })
    }
}

module.exports = controller;