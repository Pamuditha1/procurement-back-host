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

router.post("/", createMSR);

router.get("/:id", getOneMSR);

router.get("/", getAllMSRS);

router.get("/count", getCreatedCount);

router.get("/count/approved", getApprovedCount);

router.get("/count/rejected", getRejectedCount);

router.get("/count/pr-pending", getPRPendingCount);

router.put("/", updateMSR);

router.put("/recreated", recreateMSR);

module.exports = router;
