const express = require("express");
const router = express.Router();
const { getSiteEngineers } = require("../controllers/ses");
const auth = require("../middleware/auth");

router.get("/", (req, res, next) => auth(req, res, next), getSiteEngineers);

module.exports = router;
