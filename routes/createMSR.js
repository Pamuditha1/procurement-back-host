const express = require("express");
const router = express.Router();

const { MSR } = require("../modules/msrModule");

router.post("/", async (req, res) => {
  let msr = await MSR.findOne({ msrNo: req.body.msrData.msrNo });
  if (msr)
    return res
      .status(400)
      .send(`MSR ${req.body.msrData.msrNo} Already Created`);

  let newMSR = new MSR({
    timeStamp: new Date().toISOString(),
    msrNo: req.body.msrData.msrNo,
    items: req.body.msr,
    project: req.body.msrData.project,
    createdBy: req.body.userID,
    status: "Created",
    prStatus: "",
  });

  await newMSR.save();

  res.status(200).send("MSR Successfully Created");

  return;
});

module.exports = router;
