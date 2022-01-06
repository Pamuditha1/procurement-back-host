const { MSR } = require("../modules/msrModule");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createMSR = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error (Create MSR) : ", error);
    res.status(500).send(error);
  }
};

exports.getAllMSRS = async function (req, res) {
  try {
    const msrs = await MSR.find({})
      .sort({ timeStamp: "desc" })
      .populate("createdBy", "-password")
      .populate("approvedBy", "-password")
      .populate("project");

    if (msrs.length === 0) return res.status(404).send("No MSRs Found");

    res.status(200).send(msrs);
  } catch (error) {
    console.error("Error (Get All MSRs) : ", error);
    res.status(500).send(error);
  }
};

exports.getOneMSR = async function (req, res) {
  try {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid Id");

    const msr = await MSR.findById(req.params.id)
      .sort({ timeStamp: "desc" })
      .populate("createdBy", "-password")
      .populate("approvedBy", "-password")
      .populate("project");

    if (!msr) return res.status(404).send("MSR Not Found");

    res.status(200).send(msr);
  } catch (error) {
    console.error("Error (Get One MSR) : ", error);
    res.status(500).send(error);
  }
};

exports.updateMSR = async function (req, res) {
  try {
    if (!ObjectId.isValid(req.body.id))
      return res.status(400).send("Invalid Id");

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
  } catch (error) {
    console.error("Error (Update MSR) : ", error);
    res.status(500).send(error);
  }
};

exports.recreateMSR = async function (req, res) {
  try {
    if (!ObjectId.isValid(req.body.id))
      return res.status(400).send("Invalid Id");

    const msr = await MSR.findById(req.body.id);

    if (!msr) return res.status(400).send(`MSR Not Found`);

    msr.status = req.body.decision;
    await msr.save();

    res.status(200).send(`MSR ${msr.msrNo} Status Updated`);
  } catch (error) {
    console.error("Error (Recreate MSR) : ", error);
    res.status(500).send(error);
  }
};

exports.getCreatedCount = async function (req, res) {
  try {
    const msrs = await MSR.find({ status: "Created" });
    let count = 0;
    if (msrs && msrs.length !== 0) count = msrs.length;

    res.status(200).send(`${count}`);
  } catch (error) {
    console.error("Error (Created MSR Count) : ", error);
    res.status(500).send(error);
  }
};

exports.getApprovedCount = async function (req, res) {
  try {
    const msrs = await MSR.find({ status: "Approved" });
    let count = 0;
    if (msrs && msrs.length !== 0) count = msrs.length;

    res.status(200).send(`${count}`);
  } catch (error) {
    console.error("Error (Approved MSR Count) : ", error);
    res.status(500).send(error);
  }
};

exports.getRejectedCount = async function (req, res) {
  try {
    const msrs = await MSR.find({ status: "Rejected" });
    let count = 0;
    if (msrs && msrs.length !== 0) count = msrs.length;

    res.status(200).send(`${count}`);
  } catch (error) {
    console.error("Error (Rejected MSR Count) : ", error);
    res.status(500).send(error);
  }
};

exports.getPRPendingCount = async function (req, res) {
  try {
    const msrs = await MSR.find({ prStatus: "Pending" });
    let count = 0;
    if (msrs && msrs.length !== 0) count = msrs.length;

    res.status(200).send(`${count}`);
  } catch (error) {
    console.error("Error (PR Pending MSR Count) : ", error);
    res.status(500).send(error);
  }
};
