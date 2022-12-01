const express = require ("express");
const order = require ("../controllers/order.controller");

const router = express.Router();

router.route("/")
    .get(order.findAll)
    .post(order.create)

module.exports = router;
    
