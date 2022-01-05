const express = require("express");
const router = express.Router();
const { addProject, getProjects } = require("../controllers/projects");
const auth = require("../middleware/auth");

router.post("/", (req, res, next) => auth("Admin", req, res, next), addProject);

router.get("/", auth, getProjects);

module.exports = router;
