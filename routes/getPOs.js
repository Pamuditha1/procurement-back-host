const express = require("express");
const router = express.Router();

const { PO } = require("../modules/poModule");

router.get("/count/created", async function (req, res) {
  const pos = await PO.find({ status: "Created" });

  res.status(200).send(`${pos.length}`);
});

router.get("/count/grn-pending", async function (req, res) {
  const pos = await PO.find({ status: "Confirmed", grnStatus: "Pending" });

  res.status(200).send(`${pos.length}`);
});

router.get("/count/po-rejected", async function (req, res) {
  const pos = await PO.find({ status: "Rejected" });

  res.status(200).send(`${pos.length}`);
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;

  const pos = await PO.findById(id)
    .sort({ timeStamp: "desc" })
    .populate("createdBy", "-password")
    .populate("msr")
    .populate("pr")
    .populate({
      path: "msr",
      populate: {
        path: "project",
      },
    })
    .populate("se", "-password")
    .populate("supplier", "-password")
    .populate("approvedBy", "-password");

  res.status(200).send(pos);
});

router.get("/", async function (req, res) {
  const pos = await PO.find({})
    .sort({ timeStamp: "desc" })
    .populate("createdBy", "-password")
    .populate("msr")
    .populate("pr")
    .populate({
      path: "msr",
      populate: {
        path: "project",
      },
    })
    .populate("se", "-password")
    .populate("supplier", "-password")
    .populate("approvedBy", "-password");

  res.status(200).send(pos);
});

module.exports = router;
