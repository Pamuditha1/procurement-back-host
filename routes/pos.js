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

router.post("/", createPO);

router.get("/:id", getOnePO);

router.get("/", getAllPOS);

router.get("/count/created", getCreatedCount);

router.get("/count/grn-pending", getGRNPendingCount);

router.get("/count/po-rejected", getRejectedCount);

router.put("/", updatePO);

module.exports = router;
