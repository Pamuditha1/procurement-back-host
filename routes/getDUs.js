const express = require("express");
const router = express.Router();

const { DailyReport } = require("../modules/dailyReportModule");

router.get("/:id", async function (req, res) {
  const id = req.params.id;

  const dus = await DailyReport.findById(id)
    .sort({ timeStamp: "desc" })
    .populate("createdBy", "-password")
    .populate("project")
    .populate({
      model: "Item",
      path: "items.id",
    });

  res.status(200).send(dus);
});

router.get("/", async function (req, res) {
  const dus = await DailyReport.find({})
    .sort({ timeStamp: "desc" })
    .populate("createdBy", "-password")
    .populate("project")
    .populate({
      model: "Item",
      path: "items.id",
    });

  res.status(200).send(dus);
});

module.exports = router;
