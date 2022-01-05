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

router.post("/", auth, createMSR);

router.get("/:id", auth, getOneMSR);

router.get("/", auth, getAllMSRS);

router.get("/count", auth, getCreatedCount);

router.get("/count/approved", auth, getApprovedCount);

router.get("/count/rejected", auth, getRejectedCount);

router.get("/count/pr-pending", auth, getPRPendingCount);

router.put("/", auth, updateMSR);

router.put("/recreated", auth, recreateMSR);

module.exports = router;
