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

router.post("/", auth, createPO);

router.get("/:id", auth, getOnePO);

router.get("/", auth, getAllPOS);

router.get("/count/created", auth, getCreatedCount);

router.get("/count/grn-pending", auth, getGRNPendingCount);

router.get("/count/po-rejected", auth, getRejectedCount);

router.put("/", auth, updatePO);

module.exports = router;
