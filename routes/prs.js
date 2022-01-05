const express = require("express");
const router = express.Router();
const {
  createPR,
  getOnePR,
  getAllPRS,
  getPOPendingCount,
  getCreatedCount,
} = require("../controllers/prs");
const auth = require("../middleware/auth");

router.post("/", auth, createPR);

router.get("/:id", auth, getOnePR);

router.get("/", auth, getAllPRS);

router.get("/count", auth, getCreatedCount);

router.get("/count/created", auth, getCreatedCount);

router.get("/count/po-pending", auth, getPOPendingCount);

module.exports = router;
