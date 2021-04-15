const jwt = require("jsonwebtoken");
const User = require("../models/User");

class authJwt {
  static authentication(req, res, next) {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Missing_Token" };
    }
    jwt.verify(access_token, process.env.secretKey, (err, decoded) => {
      if (err) {
        res.status(401).json({ success: false, message: "invalid token" });
      }
      req.studentId = decoded.id;
      next();
    });
  }
  static spesisificStudent(req, res, next) {
    const { id } = req.params;
    Student.findById(req.studentId)
      .then((result) => {
        if (result.id === id) {
          next();
        } else {
          res.status(403).json({ success: false, message: "forbidden access" });
        }
      })
      .catch(next);
  }
}

module.exports = authJwt;
