const { Project } = require("../modules/projectModule");

exports.addProject = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error (Create Project) : ", error);
    res.status(500).send(error);
  }
};

exports.getProjects = async function (req, res) {
  try {
    const projects = await Project.find({}).sort({ _id: "desc" });

    if (projects.length === 0) return res.status(404).send("No Projects Found");

    res.status(200).send(projects);
  } catch (error) {
    console.error("Error (Get All Projects) : ", error);
    res.status(500).send(error);
  }
};
