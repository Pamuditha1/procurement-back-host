const { PR } = require("../modules/prModule");
const { PO } = require("../modules/poModule");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createPO = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error (Create PO) : ", error);
    res.status(500).send(error);
  }
};

exports.getAllPOS = async function (req, res) {
  try {
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

    if (pos.length === 0) return res.status(404).send("No POs Found");

    res.status(200).send(pos);
  } catch (error) {
    console.error("Error (Get All POs) : ", error);
    res.status(500).send(error);
  }
};

exports.getOnePO = async function (req, res) {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).send("Invalid Id");

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

    if (!pos) return res.status(404).send("PO Not Found");

    res.status(200).send(pos);
  } catch (error) {
    console.error("Error (Get One PO) : ", error);
    res.status(500).send(error);
  }
};

exports.getCreatedCount = async function (req, res) {
  try {
    const pos = await PO.find({ status: "Created" });
    let count = 0;
    if (pos && pos.length !== 0) count = pos.length;

    res.status(200).send(`${count}`);
  } catch (error) {
    console.error("Error (Created PR Count) : ", error);
    res.status(500).send(error);
  }
};

exports.getGRNPendingCount = async function (req, res) {
  try {
    const pos = await PO.find({ status: "Confirmed", grnStatus: "Pending" });
    let count = 0;
    if (pos && pos.length !== 0) count = pos.length;

    res.status(200).send(`${count}`);
  } catch (error) {
    console.error("Error (GRN Pending PR Count) : ", error);
    res.status(500).send(error);
  }
};

exports.getRejectedCount = async function (req, res) {
  try {
    const pos = await PO.find({ status: "Rejected" });
    let count = 0;
    if (pos && pos.length !== 0) count = pos.length;

    res.status(200).send(`${count}`);
  } catch (error) {
    console.error("Error (Rejected PR Count) : ", error);
    res.status(500).send(error);
  }
};

exports.updatePO = async function (req, res) {
  try {
    if (!ObjectId.isValid(req.body.id))
      return res.status(400).send("Invalid Id");

    const po = await PO.findById(req.body.id)
      .populate("createdBy", "-password")
      .populate("approvedBy", "-password");

    if (!po) return res.status(400).send("PO Not Found");

    po.status = req.body.decision;
    po.reasons = req.body.reasons;
    po.approvedBy = req.body.user;
    po.approvedDate = new Date().toISOString();

    if (req.body.decision == "Confirmed") {
      po.grnStatus = "Pending";
    }
    await po.save();

    res.status(200).send(`PO ${req.body.decision}`);
  } catch (error) {
    console.error("Error (Update PO) : ", error);
    res.status(500).send(error);
  }
};
