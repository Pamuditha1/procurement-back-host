const bcrypt = require("bcrypt");

const { User } = require("../modules/userModule");

exports.addUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already Registered.");

  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    contactNo: req.body.contactNo,
    contactNo2: req.body.contactNo2,
    nic: req.body.nic,
    address: req.body.address,
    password: req.body.password,
    type: req.body.type,
    district: req.body.district,
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  await newUser.save();
  res.status(200).send("Successfully Registered the User");

  return;
};

exports.getAllUsers = async function (req, res) {
  const users = await User.find({}).select("-password");
  res.status(200).send(users);
};

exports.getOneUser = async function (req, res) {
  const id = req.params.id;
  const users = await User.findById(id).select("-password");
  res.status(200).send(users);
};

exports.updateUser = async function (req, res) {
  const user = await User.findById(req.body.user._id);
  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.contactNo = req.body.user.contactNo;
  user.address = req.body.user.address;

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.pass, salt);

  await user.save();

  res.status(200).send(`${req.body.user.username} Successfully Updated`);
};

exports.removeUser = async function (req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).send(`User Successfully Removed`);
};
