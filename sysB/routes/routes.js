const express = require("express");
const router = express.Router();

const controllers = require("../controllers/controllers.js");

router.get("/dashboard", controllers.getDashBoard);

router.get("/", controllers.redirect);


module.exports = router;