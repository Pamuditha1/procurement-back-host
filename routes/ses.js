const express = require("express");
const router = express.Router();
const { getSiteEngineers } = require("../controllers/ses");
const auth = require("../middleware/auth");

router.post("/", auth, getSiteEngineers);

module.exports = router;
