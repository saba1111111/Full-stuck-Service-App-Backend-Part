const express = require("express")
const personRoutesFuncs = require("../controllers/personData");
const isAuth = require("../helpers/is-auth");
const router = express.Router();

router.get("/getPersons",personRoutesFuncs.getPersons)
router.post("/addPerson",isAuth.isAuth,personRoutesFuncs.addPerson);

router.put('/editPerson',isAuth.isAuth,personRoutesFuncs.editPerson);
router.post('/deletePerson',isAuth.isAuth,personRoutesFuncs.deletePerson);

module.exports = router;