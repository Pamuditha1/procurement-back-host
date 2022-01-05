const express = require("express");
const router = express.Router();
const {
  addItem,
  getAllItems,
  getOneItem,
  updateItem,
} = require("../controllers/items");
const auth = require("../middleware/auth");

router.post("/", (req, res, next) => auth("Admin", req, res, next), addItem);

router.get("/:id", auth, getOneItem);

router.get("/", auth, getAllItems);

router.put("/", (req, res, next) => auth("Admin", req, res, next), updateItem);

module.exports = router;
