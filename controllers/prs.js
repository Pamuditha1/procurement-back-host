const { PR } = require("../modules/prModule");
const { MSR } = require("../modules/msrModule");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createPR = async (req, res) => {
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
};

exports.getAllPRS = async function (req, res) {
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
  res.status(200).send(prs);
};

exports.getOnePR = async function (req, res) {
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

  if (!pr) return res.status(404).send();
  res.status(200).send(pr);
};

exports.getCreatedCount = async function (req, res) {
  const msrs = await PR.find({ status: "Created" });
  res.status(200).send(`${msrs.length}`);
};

exports.getPOPendingCount = async function (req, res) {
  const prs = await PR.find({ poStatus: "Pending" });
  res.status(200).send(`${prs.length}`);
};
