const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;

const { User } = require("../modules/userModule");

exports.addUser = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error (Add User) : ", error);
    res.status(500).send(error);
  }
};

exports.getAllUsers = async function (req, res) {
  try {
    const users = await User.find({}).select("-password");

    if (users.length === 0) return res.status(404).send("No Users Found");

    res.status(200).send(users);
  } catch (error) {
    console.error("Error (Get All Users) : ", error);
    res.status(500).send(error);
  }
};

exports.getOneUser = async function (req, res) {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) return res.status(400).send("Invalid Id");

    const users = await User.findById(id).select("-password");

    if (!users) return res.status(404).send("User Not Found");

    res.status(200).send(users);
  } catch (error) {
    console.error("Error (Get One User) : ", error);
    res.status(500).send(error);
  }
};

exports.updateUser = async function (req, res) {
  try {
    if (!ObjectId.isValid(req.body.user._id))
      return res.status(400).send("Invalid Id");

    const user = await User.findById(req.body.user._id);

    if (!user) return res.status(400).send("User Not Found");

    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.contactNo = req.body.user.contactNo;
    user.address = req.body.user.address;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.pass, salt);

    await user.save();

    res.status(200).send(`${req.body.user.username} Successfully Updated`);
  } catch (error) {
    console.error("Error (Update User) : ", error);
    res.status(500).send(error);
  }
};

exports.removeUser = async function (req, res) {
  try {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("Invalid Id");

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(400).send("User Not Found");

    res.status(200).send(`User Successfully Removed`);
  } catch (error) {
    console.error("Error (Remove User) : ", error);
    res.status(500).send(error);
  }
};
