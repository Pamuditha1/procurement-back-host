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

router.post("/", (req, res, next) => auth(req, res, next, "Admin"), addUser);

router.get("/:id", (req, res, next) => auth(req, res, next), getOneUser);

router.get("/", (req, res, next) => auth(req, res, next), getAllUsers);

router.put("/", (req, res, next) => auth(req, res, next, "Admin"), updateUser);

router.delete(
  "/remove/:id",
  (req, res, next) => auth(req, res, next, "Admin"),
  removeUser
);

module.exports = router;
