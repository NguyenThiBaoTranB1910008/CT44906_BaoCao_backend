const express = require ("express");
const users = require ("../controllers/user.controller");
// const { route } = require("./user.route.");

const router = express.Router();

router.route("/")
    .get(users.findAll)
    .post(users.create)
    
router.route("/:name")
    .get(users.findOne)

router.route("/check")
    .post(users.checkAccount)

module.exports = router;
    
