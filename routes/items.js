const express = require("express");
const router = express.Router();
const {
  addItem,
  getAllItems,
  getOneItem,
  updateItem,
} = require("../controllers/items");

router.post("/", addItem);

router.get("/:id", getOneItem);

router.get("/", getAllItems);

router.put("/", updateItem);

module.exports = router;
