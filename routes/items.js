const express = require("express");
const router = express.Router();
const {
  addItem,
  getAllItems,
  getOneItem,
  updateItem,
} = require("../controllers/items");
const auth = require("../middleware/auth");

router.post("/", (req, res, next) => auth(req, res, next, "Admin"), addItem);

router.get("/:id", (req, res, next) => auth(req, res, next), getOneItem);

router.get("/", auth, getAllItems);

router.put("/", (req, res, next) => auth(req, res, next, "Admin"), updateItem);

module.exports = router;
