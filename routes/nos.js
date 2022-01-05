const express = require("express");
const router = express.Router();
const {
  generateMSRno,
  generatePRno,
  generatePOno,
  generateGRNno,
  generateDURno,
} = require("../controllers/nos");

router.get("/msr", generateMSRno);

router.get("/pr", generatePRno);

router.get("/po", generatePOno);

router.get("/grn", generateGRNno);

router.get("/usage", generateDURno);

module.exports = router;
