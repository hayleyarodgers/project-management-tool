// Import project, feature and task models
const { Project, User } = require("../models");

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

		// Add project to list of those created by the current user (manager)
		const user = await User.findOneAndUpdate(
			{ _id: body.managerId },
			{ $addToSet: { projects: project._id } },
			{ new: true }
		);

		if (!user) {
			return res
				.status(400)
				.json({ message: "Project created but not linked to manager." });
		}

		res.status(200).json(project);
	},

	// Update project
	async updateProject({ body, params }, res) {
		const project = await Project.findOneAndUpdate(
			{ _id: params.projectId },
			{ $set: body },
			{ runValidators: true, new: true }
		);

		if (!project) {
			return res.status(400).json({ message: "Unable to update project." });
		}

		res.status(200).json(project);
	},

	// Delete project
	async deleteProject({ params }, res) {
		const project = await Project.findOneAndDelete({ _id: params.projectId });

		if (!project) {
			return res.status(400).json({ message: "Unable to delete project." });
		}

		res.status(200).json({ message: "Project deleted." });
	},

	// Get all features in project
	async getAllFeatures({ params }, res) {
		const project = await Project.findOne({ _id: params.projectId });
		const allFeatures = project.features;

		if (!allFeatures) {
			return res.status(400).json({ message: "No features found." });
		}

		res.status(200).json(allFeatures);
	},

	// Get one feature in project
	async getFeature({ params }, res) {
		const project = await Project.findOne({ _id: params.projectId });
		const feature = project.features.id(params.featureId);

		if (!feature) {
			return res.status(400).json({ message: "Unable to get feature." });
		}

		res.status(200).json(feature);
	},

	// Add feature to project
	async createFeature({ body, params }, res) {
		const project = await Project.findOneAndUpdate(
			{ _id: params.projectId },
			{ $push: { features: body } },
			{ runValidators: true, new: true }
		);

		if (!project) {
			return res.status(400).json({ message: "Unable to create feature." });
		}

		res.status(200).json(project);
	},

	// Update feature in project
	// NOT WORKING...
	async updateFeature({ body, params }, res) {
		const project = await Project.findOneAndUpdate(
			{ _id: params.projectId, "features.featureId": params.featureId },
			{ $set: { "features.$": body } },
			{ runValidators: true, new: true }
		);

		if (!project) {
			return res.status(400).json({ message: "Unable to update feature." });
		}

		res.status(200).json(project);
	},

	// Delete feature in project
	async deleteFeature({ params }, res) {
		const project = await Project.findOneAndUpdate(
			{ _id: params.projectId },
			{ $pull: { features: { _id: params.featureId } } },
			{ new: true }
		);

		if (!project) {
			return res.status(400).json({ message: "Unable to delete feature," });
		}

		res.status(200).json({ message: "Feature deleted." });
	},

	// Get all tasks in feature
	async getAllTasks({ params }, res) {
		const project = await Project.findOne({ _id: params.projectId });
		const feature = project.features.id(params.featureId);
		const tasks = feature.tasks;

		if (!tasks) {
			return res.status(400).json({ message: "Unable to get tasks." });
		}

		res.status(200).json(tasks);
	},

	// Get one task in feature

	// Add task to feature
	// NOT WORKING - need some way to specify which feature's tasks we're looking at
	async createTask({ body, params }, res) {
		const project = await Project.findOneAndUpdate(
			{ _id: params.projectId },
			{ $push: { features: { tasks: { body } } } },
			{ runValidators: true, new: true }
		);

		if (!project) {
			return res.status(400).json({ message: "Unable to create feature." });
		}

		res.status(200).json(project);
	},

	// Update task in feature

	// Delete task in feature
};
