const express = require("express");
const router = express.Router();
const { getSuppliers } = require("../controllers/suppliers");

router.post("/names", getSuppliers);

module.exports = router;
