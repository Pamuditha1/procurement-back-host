const { Project } = require("../modules/projectModule");

exports.addProject = async (req, res) => {
  let project = await Project.find({
    $or: [{ name: req.body.name }, { projectNo: req.body.projectNo }],
  });

  if (project.length !== 0)
    return res.status(400).send("Project Already Added.");

  let newProject = new Project({
    projectNo: req.body.projectNo,
    name: req.body.name,
    location: req.body.location,
    type: req.body.type,
    client: req.body.client,
    clientCoNo: req.body.clientCoNo,
  });

  await newProject.save();

  res.status(200).send("Project Successfully Added");
  return;
};

exports.getProjects = async function (req, res) {
  const projects = await Project.find({}).sort({ _id: "desc" });
  res.status(200).send(projects);
};
