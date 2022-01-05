const express = require("express");
const router = express.Router();
const {
  createPR,
  getOnePR,
  getAllPRS,
  getPOPendingCount,
  getCreatedCount,
} = require("../controllers/prs");

router.post("/", createPR);

router.get("/:id", getOnePR);

router.get("/", getAllPRS);

router.get("/count", getCreatedCount);

router.get("/count/created", getCreatedCount);

router.get("/count/po-pending", getPOPendingCount);

module.exports = router;
