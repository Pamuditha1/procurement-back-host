const express = require("express");
const router = express.Router();
const { getSuppliers } = require("../controllers/suppliers");
const auth = require("../middleware/auth");

router.post("/names", auth, getSuppliers);

module.exports = router;
