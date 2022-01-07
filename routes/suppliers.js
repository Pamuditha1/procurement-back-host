const express = require("express");
const router = express.Router();
const { getSuppliers } = require("../controllers/suppliers");
const auth = require("../middleware/auth");

router.get("/names", (req, res, next) => auth(req, res, next), getSuppliers);

module.exports = router;
