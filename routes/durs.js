const express = require("express");
const router = express.Router();
const { createDUR, getAllDURs, getOneDUR } = require("../controllers/durs");

router.post("/", createDUR);

router.get("/:id", getOneDUR);

router.get("/", getAllDURs);

module.exports = router;
