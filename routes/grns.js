const express = require("express");
const router = express.Router();
const { createGRN, getAllGRNs, getOneGRN } = require("../controllers/grns");
const auth = require("../middleware/auth");

router.post("/", auth, createGRN);

router.get("/:id", auth, getOneGRN);

router.get("/", auth, getAllGRNs);

module.exports = router;
