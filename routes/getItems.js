const express = require("express");
const router = express.Router();

const { Item } = require("../modules/itemModule");

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const item = await Item.findById(id);
  res.status(200).send(item);
});

router.get("/", async function (req, res) {
  const items = await Item.find({}).sort({ quantity: "desc" });
  res.status(200).send(items);
});

module.exports = router;
