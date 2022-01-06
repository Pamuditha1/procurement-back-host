const { User } = require("../modules/userModule");

exports.getSuppliers = async function (req, res) {
  try {
    const suppliers = await User.find({ type: "Supplier" }).select("-password");

    if (suppliers.length === 0)
      return res.status(404).send("No Suppliers Found");

    res.status(200).send(suppliers);
  } catch (error) {
    console.error("Error (Get Suppliers) : ", error);
    res.status(500).send(error);
  }
};
