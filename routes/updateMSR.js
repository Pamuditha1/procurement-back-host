const express = require("express");
const router = express.Router();

const { MSR } = require("../modules/msrModule");

router.post("/", async function (req, res) {
  const msr = await MSR.findById(req.body.id)
    .populate("createdBy", "-password")
    .populate("approvedBy", "-password");

  if (!msr) return res.status(400).send(`MSR Not Found`);

  msr.status = req.body.decision;
  msr.reasons = req.body.reasons;
  msr.approvedBy = req.body.user;
  if (req.body.decision == "Approved") {
    msr.prStatus = "Pending";
  }
  await msr.save();

  res.status(200).send(`MSR ${msr.msrNo} ${req.body.decision}`);
});
router.post("/recreated", async function (req, res) {
  const msr = await MSR.findById(req.body.id);

  if (!msr) return res.status(400).send(`MSR Not Found`);

  msr.status = req.body.decision;
  await msr.save();

  res.status(200).send(`MSR ${msr.msrNo} Status Updated`);
});

module.exports = router;
