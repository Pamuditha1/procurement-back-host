const express = require("express");
const router = express.Router();
const {
  createMSR,
  getAllMSRS,
  getOneMSR,
  updateMSR,
  recreateMSR,
  getCreatedCount,
  getApprovedCount,
  getRejectedCount,
  getPRPendingCount,
} = require("../controllers/msrs");
const auth = require("../middleware/auth");

router.post("/", (req, res, next) => auth(req, res, next), createMSR);

router.get("/:id", (req, res, next) => auth(req, res, next), getOneMSR);

router.get("/", (req, res, next) => auth(req, res, next), getAllMSRS);

router.get("/count", (req, res, next) => auth(req, res, next), getCreatedCount);

router.get(
  "/count/approved",
  (req, res, next) => auth(req, res, next),
  getApprovedCount
);

router.get(
  "/count/rejected",
  (req, res, next) => auth(req, res, next),
  getRejectedCount
);

router.get(
  "/count/pr-pending",
  (req, res, next) => auth(req, res, next),
  getPRPendingCount
);

router.put("/", (req, res, next) => auth(req, res, next), updateMSR);

router.put("/recreated", (req, res, next) => auth(req, res, next), recreateMSR);

module.exports = router;
