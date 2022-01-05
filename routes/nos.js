const express = require("express");
const router = express.Router();
const {
  generateMSRno,
  generatePRno,
  generatePOno,
  generateGRNno,
  generateDURno,
} = require("../controllers/nos");
const auth = require("../middleware/auth");

router.get("/msr", auth, generateMSRno);

router.get("/pr", auth, generatePRno);

router.get("/po", auth, generatePOno);

router.get("/grn", auth, generateGRNno);

router.get("/usage", auth, generateDURno);

module.exports = router;
