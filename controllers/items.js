const { Item } = require("../modules/itemModule");
const ObjectId = require("mongoose").Types.ObjectId;

exports.addItem = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error (Create Item) : ", error);
    res.status(500).send(error);
  }
};

exports.getAllItems = async function (req, res) {
  try {
    const items = await Item.find({}).sort({ quantity: "desc" });

    if (items.length === 0) return res.status(404).send("No Items Found");

    res.status(200).send(items);
  } catch (error) {
    console.error("Error (Get All Items) : ", error);
    res.status(500).send(error);
  }
};

exports.getOneItem = async function (req, res) {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).send("Invalid Id");

    const item = await Item.findById(id);

    if (!item) return res.status(404).send("Item Not Found");

    res.status(200).send(item);
  } catch (error) {
    console.error("Error (Get One Item) : ", error);
    res.status(500).send(error);
  }
};

exports.updateItem = async function (req, res) {
  try {
    if (!ObjectId.isValid(req.body._id))
      return res.status(400).send("Invalid Id");

    const item = await Item.findById(req.body._id);

    if (!item) return res.status(400).send("Item Not Found");

    item.code = req.body.code;
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.reorderL = req.body.reorderL;

    await item.save();
    res.status(200).send(`${req.body.name} Successfully Updated`);
  } catch (error) {
    console.error("Error (Update Item) : ", error);
    res.status(500).send(error);
  }
};
