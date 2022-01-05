const express = require("express");
const router = express.Router();
const { createGRN, getAllGRNs, getOneGRN } = require("../controllers/grns");

router.post("/", createGRN);

router.get("/:id", getOneGRN);

router.get("/", getAllGRNs);

module.exports = router;
