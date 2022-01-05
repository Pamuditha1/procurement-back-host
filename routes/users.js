const express = require("express");
const router = express.Router();
const {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  removeUser,
} = require("../controllers/users");

router.post("/", addUser);

router.get("/:id", getOneUser);

router.get("/", getAllUsers);

router.put("/", updateUser);

router.delete("/remove/:id", removeUser);

module.exports = router;
