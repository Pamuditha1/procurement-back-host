const { PR } = require("../modules/prModule");
const { MSR } = require("../modules/msrModule");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createPR = async (req, res) => {
  try {
    let pr = await PR.findOne({ prNo: req.body.prNo });
    if (pr) return res.status(400).send(`PR ${req.body.prNo} Already Created`);

    let newPR = new PR({
      timeStamp: new Date().toISOString(),
      prNo: req.body.prNo,
      items: req.body.pr,
      createdBy: req.body.user,
      msr: req.body.msr._id,
      poStatus: "Pending",
      status: "Created",
    });
    let result = await newPR.save();

    const msr = await MSR.findById(req.body.msr._id).populate(
      "createdBy",
      "-_id -password"
    );

    msr.prStatus = "Created";
    await msr.save();

    if (result) res.status(200).send("PR Successfully Created");

    return;
  } catch (error) {
    console.error("Error (Create PR) : ", error);
    res.status(500).send(error);
  }
};

exports.getAllPRS = async function (req, res) {
  try {
    const prs = await PR.find({})
      .sort({ timeStamp: "desc" })
      .populate("createdBy", "-password")
      .populate("msr")
      .populate({
        path: "msr",
        populate: {
          path: "project",
        },
      });

    if (prs.length === 0) return res.status(404).send("No PRs Found");

    res.status(200).send(prs);
  } catch (error) {
    console.error("Error (Get All PRs) : ", error);
    res.status(500).send(error);
  }
};

exports.getOnePR = async function (req, res) {
  try {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid Object Id");

    const pr = await PR.findById(req.params.id)
      .sort({ timeStamp: "desc" })
      .populate("createdBy", "-password")
      .populate("msr")
      .populate({
        path: "msr",
        populate: {
          path: "project",
        },
      });

    if (!pr) return res.status(404).send("PR Not Found");

    res.status(200).send(pr);
  } catch (error) {
    console.error("Error (Get One PR) : ", error);
    res.status(500).send(error);
  }
};

exports.getCreatedCount = async function (req, res) {
  try {
    const prs = await PR.find({ status: "Created" });
    let count = 0;
    if (prs && prs.length !== 0) count = prs.length;

    res.status(200).send(`${count}`);
  } catch (error) {
    console.error("Error (Created PR Count) : ", error);
    res.status(500).send(error);
  }
};

exports.getPOPendingCount = async function (req, res) {
  try {
    const prs = await PR.find({ poStatus: "Pending" });
    let count = 0;
    if (prs && prs.length !== 0) count = prs.length;

    res.status(200).send(`${count}`);
  } catch (error) {
    console.error("Error (PO Pending PR Count) : ", error);
    res.status(500).send(error);
  }
};
