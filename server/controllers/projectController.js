// Import project, feature and task models
const { Project, User } = require("../models");

module.exports = {
	// Get all projects
	async getAllProjects(req, res) {
		try {
			const allProjects = await Project.find({});

			if (!allProjects) {
				return res.status(400).json({ message: "No projects found." });
			}

			res.status(200).json(allProjects);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Get a project by its id
	async getProject({ params }, res) {
		try {
			const project = await Project.findOne({ _id: params.projectId }).populate(
				{
					path: "features",
					populate: "featureAssignee",
				}
			);

			if (!project) {
				return res
					.status(400)
					.json({ message: "No project found with that id." });
			}

			res.status(200).json(project);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Create project
	async createProject({ body }, res) {
		try {
			const project = await Project.create(body);

			if (!project) {
				return res.status(400).json({ message: "Unable to create project." });
			}

			// Add project to list of those created by the current user (manager)
			const user = await User.findOneAndUpdate(
				{ _id: body.projectManager },
				{ $addToSet: { projects: project._id } },
				{ new: true }
			);

			if (!user) {
				return res
					.status(400)
					.json({ message: "Project created but not linked to manager." });
			}

			res.status(200).json(project);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Update project
	async updateProject({ body, params }, res) {
		try {
			const project = await Project.findOneAndUpdate(
				{ _id: params.projectId },
				{ $set: body },
				{ runValidators: true, new: true }
			);

			if (!project) {
				return res.status(400).json({ message: "Unable to update project." });
			}

			res.status(200).json(project);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Delete project
	async deleteProject({ params }, res) {
		try {
			const project = await Project.findOneAndDelete({ _id: params.projectId });

			if (!project) {
				return res.status(400).json({ message: "Unable to delete project." });
			}

			res.status(200).json({ message: "Project deleted." });
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Get all features in project
	async getAllFeatures({ params }, res) {
		try {
			const project = await Project.findOne({ _id: params.projectId }).populate(
				{
					path: "features",
					populate: "featureAssignee",
				}
			);
			const allFeatures = project.features;

			if (!allFeatures) {
				return res.status(400).json({ message: "No features found." });
			}

			res.status(200).json(allFeatures);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Get one feature in project
	async getFeature({ params }, res) {
		try {
			const project = await Project.findOne({ _id: params.projectId }).populate(
				{
					path: "features",
					populate: "featureAssignee",
				}
			);
			const feature = project.features.id(params.featureId);

			if (!feature) {
				return res.status(400).json({ message: "Unable to get feature." });
			}

			res.status(200).json(feature);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Add feature to project
	async createFeature({ body, params }, res) {
		try {
			const project = await Project.findOneAndUpdate(
				{ _id: params.projectId },
				{ $push: { features: body } },
				{ runValidators: true, new: true }
			);

			if (!project) {
				return res.status(400).json({ message: "Unable to create feature." });
			}

			res.status(200).json(project);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Update feature in project
	async updateFeature({ body, params }, res) {
		try {
			const projectData = await Project.findOne({ _id: params.projectId });
			const feature = projectData.features.id(params.featureId);
			const updatedFeature = { ...feature.toJSON(), ...body };

			const project = await Project.findOneAndUpdate(
				{ _id: params.projectId, "features._id": params.featureId },
				{ $set: { "features.$": updatedFeature } },
				{ runValidators: true, new: true }
			);

			if (!project) {
				return res.status(400).json({ message: "Unable to update feature." });
			}

			res.status(200).json(project);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Delete feature in project
	async deleteFeature({ params }, res) {
		try {
			const project = await Project.findOneAndUpdate(
				{ _id: params.projectId },
				{ $pull: { features: { _id: params.featureId } } },
				{ new: true }
			);

			if (!project) {
				return res.status(400).json({ message: "Unable to delete feature." });
			}

			res.status(200).json({ message: "Feature deleted." });
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Get all tasks in feature
	async getAllTasks({ params }, res) {
		try {
			const project = await Project.findOne({ _id: params.projectId });
			const feature = project.features.id(params.featureId);
			const tasks = feature.tasks;

			if (!tasks) {
				return res.status(400).json({ message: "Unable to get tasks." });
			}

			res.status(200).json(tasks);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Get one task in feature
	async getTask({ params }, res) {
		try {
			const project = await Project.findOne({ _id: params.projectId });
			const feature = project.features.id(params.featureId);
			const task = feature.tasks.id(params.taskId);

			if (!task) {
				return res.status(400).json({ message: "Unable to get task." });
			}

			res.status(200).json(task);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Add task to feature
	async createTask({ body, params }, res) {
		try {
			const project = await Project.findOneAndUpdate(
				{ _id: params.projectId, "features._id": params.featureId },
				{ $push: { "features.$.tasks": body } },
				{ runValidators: true, new: true }
			);

			if (!project) {
				return res.status(400).json({ message: "Unable to create task." });
			}

			res.status(200).json(project);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Update task in feature
	async updateTask({ body, params }, res) {
		try {
			const projectData = await Project.findOne({ _id: params.projectId });
			const featureData = projectData.features.id(params.featureId);
			const taskArray = featureData.tasks;

			const newTaskArray = taskArray.map((item) => {
				if (item._id == params.taskId) {
					return { ...item.toJSON(), ...body };
				} else return item;
			});

			const project = await Project.findOneAndUpdate(
				{
					_id: params.projectId,
					"features._id": params.featureId,
				},
				{ $set: { "features.$.tasks": newTaskArray } },
				{ runValidators: true, new: true }
			);

			if (!project) {
				return res.status(400).json({ message: "Unable to update task." });
			}

			res.status(200).json(project);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Delete task in feature
	async deleteTask({ params }, res) {
		try {
			const project = await Project.findOneAndUpdate(
				{ _id: params.projectId, "features._id": params.featureId },
				{ $pull: { "features.$.tasks": { _id: params.taskId } } },
				{ new: true }
			);

			if (!project) {
				return res.status(400).json({ message: "Unable to delete task." });
			}

			res.status(200).json({ message: "Task deleted." });
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},
};
