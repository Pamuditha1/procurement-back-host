const express = require("express");
const router = express.Router();

const { User } = require("../modules/userModule");

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const users = await User.findById(id).select("-password");
  res.status(200).send(users);
});

router.get("/", async function (req, res) {
  const users = await User.find({}).select("-password");

  res.status(200).send(users);
});

module.exports = router;
