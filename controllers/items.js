const { Item } = require("../modules/itemModule");

exports.addItem = async (req, res) => {
  let item = await Item.find({
    $or: [{ name: req.body.name }, { code: req.body.code }],
  });
  if (item.length !== 0) return res.status(400).send("Item Already Added.");

  let newItem = new Item({
    code: req.body.code,
    name: req.body.name,
    unit: req.body.unit,
    quantity: req.body.qty,
    reorderL: req.body.reorderL,
  });

  await newItem.save();

  res.status(200).send("Item Successfully Added");
  return;
};

exports.getAllItems = async function (req, res) {
  const items = await Item.find({}).sort({ quantity: "desc" });
  res.status(200).send(items);
};

exports.getOneItem = async function (req, res) {
  const id = req.params.id;
  const item = await Item.findById(id);
  res.status(200).send(item);
};

exports.updateItem = async function (req, res) {
  const item = await Item.findById(req.body._id).sort({ _id: "desc" });
  item.code = req.body.code;
  item.name = req.body.name;
  item.unit = req.body.unit;
  item.reorderL = req.body.reorderL;

  await item.save();
  res.status(200).send(`${req.body.name} Successfully Updated`);
};
