const express = require("express");
const router = express.Router();
const {
  createPO,
  getAllPOS,
  getOnePO,
  getCreatedCount,
  getGRNPendingCount,
  getRejectedCount,
  updatePO,
} = require("../controllers/pos");
const auth = require("../middleware/auth");

router.post("/", (req, res, next) => auth(req, res, next), createPO);

router.get("/:id", (req, res, next) => auth(req, res, next), getOnePO);

router.get("/", (req, res, next) => auth(req, res, next), getAllPOS);

router.get(
  "/count/created",
  (req, res, next) => auth(req, res, next),
  getCreatedCount
);

router.get(
  "/count/grn-pending",
  (req, res, next) => auth(req, res, next),
  getGRNPendingCount
);

router.get(
  "/count/po-rejected",
  (req, res, next) => auth(req, res, next),
  getRejectedCount
);

router.put("/", (req, res, next) => auth(req, res, next), updatePO);

module.exports = router;
