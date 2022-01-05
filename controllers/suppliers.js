const { User } = require("../modules/userModule");

exports.getSuppliers = async function (req, res) {
  const suppliers = await User.find({ type: "Supplier" }).select("-password");

  res.status(200).send(suppliers);
};
