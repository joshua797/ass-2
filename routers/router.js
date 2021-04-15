const express = require("express");
const router = express.Router();

const controllerUser = require("../controllers/controllerUser");
const controllerFarm = require("../controllers/controllerFarm");
const controllerMarket = require("../controllers/controllerMarket");
const controllerBarrack = require("../controllers/controllerBarrack");

const auth = require("../middlewares/authJwt");
const errorHandler = require("../middlewares/errorHandler");

// User
// create user
router.post("/user", controllerUser.createUser);
// get user
router.get("/user", controllerUser.getUser);
// update user
router.put("/user/:id", controllerUser.updateUser);
// delete user
router.delete("/user/:id", controllerUser.deleteUser);

// create market
router.post("/market", controllerMarket.createMarket);
// get market
router.get("/market", controllerMarket.getMarket);
// update market
router.put("/market/:id", controllerMarket.updateMarket);
// delete market
router.delete("/market/:id", controllerMarket.deleteMarket);

// create barrack
router.post("/barrack", controllerBarrack.createBarrack);
// get barrack
router.get("/barrack", controllerBarrack.getBarrack);
// update barrack
router.put("/barrack/:id", controllerBarrack.updateBarrack);
// delete barrack
router.delete("/barrack/:id", controllerBarrack.deleteBarrack);

// create market
router.post("/market", controllerMarket.createMarket);
// get market
router.get("/market", controllerMarket.getMarket);
// update market
router.put("/market/:id", controllerMarket.updateMarket);
// delete market
router.delete("/market/:id", controllerMarket.deleteMarket);

//create student
// router.post("/student", controller.createStudent);
// router.post("/student/login", controller.loginStudent)
// router.use(auth.authentication);
// //find all data student
// router.get("/student", controller.findAllStudent);
// //find specific student
// router.get("/student/:id", controller.GetStudentId);

// //update data student
// router.put("/student/:id", auth.spesisificStudent, controller.updateStudent);

// //delete data student
// router.delete("/student/:id", auth.spesisificStudent, controller.deleteStudent);

// router.patch("/student/:id", controller.patchGrade);

// router.post("/grade", controller.postGrade);

router.use(errorHandler);

module.exports = router;
