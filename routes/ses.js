const express = require("express");
const router = express.Router();
const { getSiteEngineers } = require("../controllers/ses");

router.post("/", getSiteEngineers);

module.exports = router;
