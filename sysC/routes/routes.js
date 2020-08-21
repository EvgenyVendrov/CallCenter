const express = require("express");
const router = express.Router();

const controllers = require("../controllers/controllers.js");

router.get("/allData", controllers.getAllData);



module.exports = router;