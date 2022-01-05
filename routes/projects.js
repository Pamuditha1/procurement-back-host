const express = require("express");
const router = express.Router();
const { addProject, getProjects } = require("../controllers/projects");

router.post("/", addProject);

router.get("/", getProjects);

module.exports = router;
