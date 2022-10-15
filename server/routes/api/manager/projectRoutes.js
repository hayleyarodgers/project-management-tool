const router = require("express").Router();

const {
	getAllProjects,
	getSingleProject,
	createProject,
	updateProject,
	deleteProject,
	getAllFeatures,
	getSingleFeature,
	createFeature,
	updateFeature,
	deleteFeature,
	getAllTasks,
	getSingleTask,
	createTask,
	updateTask,
	deleteTask,
} = require("../../../controllers/manager/projectController");

// /api/manager/projects
router.route("/").get(getAllProjects).post(createProject);

// /api/manager/projects/:projectId
router
	.route("/:projectId")
	.get(getSingleProject)
	.put(updateProject)
	.delete(deleteProject);

// /api/manager/projects/:projectId/features
router.route("/:projectId/features").get(getAllFeatures).post(createFeature);

// /api/manager/projects/:projectId/features/:featureId
router
	.route("/:projectId/features/:featureId")
	.get(getSingleFeature)
	.put(updateFeature)
	.delete(deleteFeature);

// /api/manager/projects/:projectId/features/:featureId/tasks
router
	.route("/:projectId/features/:featureId/tasks")
	.get(getAllTasks)
	.post(createTask);

// /api/manager/projects/:projectId/features/:featureId/tasks/:taskId
router
	.route("/:projectId/features/:featureId/tasks/:taskId")
	.get(getSingleTask)
	.put(updateTask)
	.delete(deleteTask);

module.exports = router;
