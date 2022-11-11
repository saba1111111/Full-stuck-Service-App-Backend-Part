const express = require("express");
const controllersFuncs = require("../controllers/auth");
const router = express.Router();
const {body} = require("express-validator");



router.post('/signUp',[body("email","Invalid email adrees!").isEmail(),body("password","Password must be at least 5 character").isLength({min: 5})],controllersFuncs.postSignUp);

router.post("/login",[body("email","Invalid email adrees!").isEmail(),body("password","Password must be at least 5 character").isLength({min: 5})],controllersFuncs.postLogin)

router.post("/passwordReset",controllersFuncs.resetPaswordCheckEmail)
router.post("/passwordReset/:token",controllersFuncs.resetPasword)
module.exports = router;