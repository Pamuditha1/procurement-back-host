const express = require("express");
const router = express.Router();
const { createDUR, getAllDURs, getOneDUR } = require("../controllers/durs");
const auth = require("../middleware/auth");

router.post("/", auth, createDUR);

router.get("/:id", auth, getOneDUR);

router.get("/", auth, getAllDURs);

module.exports = router;
