const { User } = require("../modules/userModule");

exports.getSiteEngineers = async function (req, res) {
  const ses = await User.find({ type: "Site Engineer" }).select("-password");
  res.status(200).send(ses);
};
