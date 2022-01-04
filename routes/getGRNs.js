const express = require("express");
const router = express.Router();

const { GRN } = require("../modules/grnModule");

router.get("/:id", async function (req, res) {
  const id = req.params.id;

  const grns = await GRN.findById(id)
    .sort({ timeStamp: "desc" })
    .populate("createdBy", "-password")
    .populate("msr")
    .populate("pr")
    .populate("po")
    .populate({
      path: "msr",
      populate: {
        path: "project",
      },
    })
    .populate({
      path: "po",
      populate: {
        path: "supplier",
      },
    })
    .populate({
      path: "po",
      populate: {
        path: "se",
      },
    });

  // console.log(prs)
  res.status(200).send(grns);
  // console.log(pos)
});

router.get("/", async function (req, res) {
  const grns = await GRN.find({})
    .sort({ timeStamp: "desc" })
    .populate("createdBy", "-password")
    .populate("msr")
    .populate("pr")
    .populate("po")
    .populate({
      path: "msr",
      populate: {
        path: "project",
      },
    })
    .populate({
      path: "po",
      populate: {
        path: "supplier",
      },
    })
    .populate({
      path: "po",
      populate: {
        path: "se",
      },
    });

  // console.log(prs)
  res.status(200).send(grns);
  // console.log(pos)
});

module.exports = router;
