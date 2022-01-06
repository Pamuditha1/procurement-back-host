const express = require("express");
const router = express.Router();
const { createGRN, getAllGRNs, getOneGRN } = require("../controllers/grns");
const auth = require("../middleware/auth");

router.post("/", (req, res, next) => auth(req, res, next), createGRN);

router.get("/:id", (req, res, next) => auth(req, res, next), getOneGRN);

router.get("/", (req, res, next) => auth(req, res, next), getAllGRNs);

module.exports = router;
