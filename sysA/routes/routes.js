const express = require("express");
const router = express.Router();

const controllers = require("../controllers/controllers.js");

router.get("/sender", controllers.getCallCenter);

module.exports = router;