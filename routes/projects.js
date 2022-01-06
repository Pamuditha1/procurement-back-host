const express = require("express");
const router = express.Router();
const { addProject, getProjects } = require("../controllers/projects");
const auth = require("../middleware/auth");

router.post("/", (req, res, next) => auth(req, res, next, "Admin"), addProject);

router.get("/", (req, res, next) => auth(req, res, next), getProjects);

module.exports = router;
