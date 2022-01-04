const express = require("express");
const router = express.Router();

const { Item } = require("../modules/itemModule");

router.post("/", async (req, res) => {
  // check whether the item already added

  let item = await Item.find({
    $or: [{ name: req.body.name }, { code: req.body.code }],
  });
  if (item.length !== 0) return res.status(400).send("Item Already Added.");

  //create new item object

  let newItem = new Item({
    code: req.body.code,
    name: req.body.name,
    unit: req.body.unit,
    quantity: req.body.qty,
    reorderL: req.body.reorderL,
  });

  //save item

  await newItem.save();

  //response

  res.status(200).send("Item Successfully Added");
  return;
});

module.exports = router;
