// Import project, feature and task models
const { Project, Feature, Task } = require("../../models");

module.exports = {
	// Get all projects
	async getAllProjects(req, res) {
		const allProjects = await Project.find({});

		if (!allProjects) {
			return res.status(400).json({ message: "No projects found." });
		}

		res.status(200).json(allProjects);
	},

	// Get a project by its id
	async getProject({ params }, res) {
		const project = await Project.findOne({ _id: params.projectId });

		if (!project) {
			return res
				.status(400)
				.json({ message: "No project found with that id." });
		}

		res.status(200).json(project);
	},

	// Create project
	async createProject({ body }, res) {
		const project = await Project.create(body);

		if (!project) {
			return res.status(400).json({ message: "Unable to create project." });
		}

		res.status(200).json(project);
	},

	// Update project
	async updateProject({ body }, res) {
		const project = await Project.findOneAndUpdate(
			{ _id: body.projectId },
			{ $set: body },
			{ runValidators: true, new: true }
		);

		if (!project) {
			return res.status(400).json({ message: "Unable to update project." });
		}

		res.status(200).json(project);
	},

	// Delete project
	async deleteProject({ body }, res) {
		const project = await Project.findOneAndDelete({ _id: body.projectId });

		if (!project) {
			return res.status(400).json({ message: "Unable to delete project." });
		}

		await Task.deleteMany({ _id: { $in: project.features.tasks } });
		await Feature.deleteMany({ _id: { $in: project.features } });

		res.status(200).json({ message: "Project deleted." });
	},

	// Get all features in project
	async getAllFeatures({ params }, res) {
		const allFeatures = await Project.findOne({ _id: params.projectId })
			.select("-__v")
			.populate("features");

		if (!allFeatures) {
			return res.status(400).json({ message: "No features found." });
		}

		res.status(200).json(allFeatures);
	},

	// Get one feature in project

	// Add feature to project

	// Update feature in project

	// Delete feature in project

	// Get all tasks in feature

	// Get one task in feature

	// Add task to feature

	// Update task in feature

	// Delete task in feature
};
