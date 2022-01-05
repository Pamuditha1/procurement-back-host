const express = require("express");
const router = express.Router();
const {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  removeUser,
} = require("../controllers/users");
const auth = require("../middleware/auth");

router.post("/", addUser);

router.get("/:id", auth, getOneUser);

router.get("/", auth, getAllUsers);

router.put("/", (req, res, next) => auth("Admin", req, res, next), updateUser);

router.delete(
  "/remove/:id",
  (req, res, next) => auth("Admin", req, res, next),
  removeUser
);

module.exports = router;
