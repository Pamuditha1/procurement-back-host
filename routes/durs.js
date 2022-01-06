const express = require("express");
const router = express.Router();
const { createDUR, getAllDURs, getOneDUR } = require("../controllers/durs");
const auth = require("../middleware/auth");

router.post("/", (req, res, next) => auth(req, res, next), createDUR);

router.get("/:id", (req, res, next) => auth(req, res, next), getOneDUR);

router.get("/", (req, res, next) => auth(req, res, next), getAllDURs);

module.exports = router;
