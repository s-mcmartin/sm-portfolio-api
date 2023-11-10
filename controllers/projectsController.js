const Project = require("../models/Project");
const bcrypt = require("bcrypt");

//@desc Get all projects
//@route GET /projects
//@access Private
const getAllProjects = async (req, res) => {
  const projects = await Project.find().lean();
  if (!projects?.length) {
    return res.status(400).json({ message: "No projects found" });
  }
  res.json(projects);
};

//@desc Create new project
//@route POST /projects
//@access Private
const createNewProject = async (req, res) => {
  const { name, image, description, tech, featured, github, website } =
    req.body;

  //Confirm data
  if (!name) {
    return res.status(400).json({ message: "Name required" });
  }

  //Check for duplicate
  const duplicate = await Project.findOne({ name }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate project name" });
  }

  const newProject = {
    name,
    image,
    description,
    tech,
    featured,
    github,
    website,
  };

  //Create and store new user
  const project = await Project.create(newProject);
  if (project) {
    res.status(201).json({ message: `New project ${name} created` });
  } else {
    res.status(400).json({ message: "Invalid project data received" });
  }
};

//@desc Update project
//@route PATCH /projects
//@access Private
const updateProject = async (req, res) => {
  const { name, image, description, tech, featured, github, website, id } =
    req.body;

  //Confirm data
  if (!id || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Call exec due to passing in info and receive promise
  const project = await Project.findById(id).exec();

  if (!project) {
    return res.status(400).json({ message: "Project not found" });
  }

  //Check for duplicate
  const duplicate = await Project.findOne({ name }).lean().exec();
  //Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate project name" });
  }

  (project.name = name),
    (project.image = image),
    (project.description = description),
    (project.tech = tech),
    (project.featured = featured),
    (project.github = github),
    (project.website = website);

  const updatedProject = await project.save();

  res.json({ message: `${updatedProject.name} updated` });
};

//@desc Delete project
//@route DELETE /projects
//@access Private
const deleteProject = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Project ID required." });
  }

  const project = await Project.findById(id).exec();

  if (!project) {
    return res.status(400).json({ message: "Project not found" });
  }

  const result = await project.deleteOne();

  const reply = `Project ${result.name} with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = {
  getAllProjects,
  createNewProject,
  updateProject,
  deleteProject,
};
