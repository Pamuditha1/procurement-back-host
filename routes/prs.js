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

router.post("/", (req, res, next) => auth(req, res, next), createPR);

router.get("/:id", (req, res, next) => auth(req, res, next), getOnePR);

router.get("/", (req, res, next) => auth(req, res, next), getAllPRS);

router.get("/count", (req, res, next) => auth(req, res, next), getCreatedCount);

router.get(
  "/count/created",
  (req, res, next) => auth(req, res, next),
  getCreatedCount
);

router.get(
  "/count/po-pending",
  (req, res, next) => auth(req, res, next),
  getPOPendingCount
);

module.exports = router;
