const { MSR } = require("../modules/msrModule");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createMSR = async (req, res) => {
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
};

exports.getAllMSRS = async function (req, res) {
  const msrs = await MSR.find({})
    .sort({ timeStamp: "desc" })
    .populate("createdBy", "-password")
    .populate("approvedBy", "-password")
    .populate("project");

  res.status(200).send(msrs);
};

exports.getOneMSR = async function (req, res) {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid Id");

  const msr = await MSR.findById(req.params.id)
    .sort({ timeStamp: "desc" })
    .populate("createdBy", "-password")
    .populate("approvedBy", "-password")
    .populate("project");

  res.status(200).send(msr);
};

exports.updateMSR = async function (req, res) {
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
};

exports.recreateMSR = async function (req, res) {
  const msr = await MSR.findById(req.body.id);

  if (!msr) return res.status(400).send(`MSR Not Found`);

  msr.status = req.body.decision;
  await msr.save();

  res.status(200).send(`MSR ${msr.msrNo} Status Updated`);
};

exports.getCreatedCount = async function (req, res) {
  const msrs = await MSR.find({ status: "Created" });
  res.status(200).send(`${msrs.length}`);
};

exports.getApprovedCount = async function (req, res) {
  const msrs = await MSR.find({ status: "Approved" });
  res.status(200).send(`${msrs.length}`);
};

exports.getRejectedCount = async function (req, res) {
  const msrs = await MSR.find({ status: "Rejected" });
  res.status(200).send(`${msrs.length}`);
};

exports.getPRPendingCount = async function (req, res) {
  const msrs = await MSR.find({ prStatus: "Pending" });
  res.status(200).send(`${msrs.length}`);
};
