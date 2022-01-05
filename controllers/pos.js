const { PR } = require("../modules/prModule");
const { PO } = require("../modules/poModule");

exports.createPO = async (req, res) => {
  let po = await PO.findOne({ poNo: req.body.poNo });
  if (po) return res.status(400).send(`PO ${req.body.poNo} Already Created`);

  let newPO = new PO({
    timeStamp: new Date().toISOString(),
    poNo: req.body.poNo,
    items: req.body.po,
    poDetails: req.body.poDetails,
    supplier: req.body.supplier,
    se: req.body.se,
    createdBy: req.body.user,
    msr: req.body.msr,
    pr: req.body.pr,
    status: "Created",
    grnStatus: "Pending",
  });
  let result = await newPO.save();

  const pr = await PR.findById(req.body.pr).populate(
    "createdBy",
    "-_id -password"
  );

  pr.poStatus = "Created";
  await pr.save();

  if (result) res.status(200).send("PO Successfully Created");

  return;
};

exports.getAllPOS = async function (req, res) {
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
};

exports.getOnePO = async function (req, res) {
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
};

exports.getCreatedCount = async function (req, res) {
  const pos = await PO.find({ status: "Created" });
  res.status(200).send(`${pos.length}`);
};

exports.getGRNPendingCount = async function (req, res) {
  const pos = await PO.find({ status: "Confirmed", grnStatus: "Pending" });
  res.status(200).send(`${pos.length}`);
};

exports.getRejectedCount = async function (req, res) {
  const pos = await PO.find({ status: "Rejected" });
  res.status(200).send(`${pos.length}`);
};

exports.updatePO = async function (req, res) {
  const po = await PO.findById(req.body.id)
    .populate("createdBy", "-password")
    .populate("approvedBy", "-password");

  po.status = req.body.decision;
  po.reasons = req.body.reasons;
  po.approvedBy = req.body.user;
  po.approvedDate = new Date().toISOString();

  if (req.body.decision == "Confirmed") {
    po.grnStatus = "Pending";
  }
  await po.save();

  res.status(200).send(`PO ${req.body.decision}`);
};
