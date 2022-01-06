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

router.get("/msr", (req, res, next) => auth(req, res, next), generateMSRno);

router.get("/pr", (req, res, next) => auth(req, res, next), generatePRno);

router.get("/po", (req, res, next) => auth(req, res, next), generatePOno);

router.get("/grn", (req, res, next) => auth(req, res, next), generateGRNno);

router.get("/usage", (req, res, next) => auth(req, res, next), generateDURno);

module.exports = router;
