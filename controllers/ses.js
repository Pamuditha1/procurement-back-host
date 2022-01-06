const { User } = require("../modules/userModule");

exports.getSiteEngineers = async function (req, res) {
  try {
    const ses = await User.find({ type: "Site Engineer" }).select("-password");

    if (ses.length === 0)
      return res.status(404).send("No Site Engineers Found");

    res.status(200).send(ses);
  } catch (error) {
    console.error("Error (Get Site Engineers) : ", error);
    res.status(500).send(error);
  }
};
