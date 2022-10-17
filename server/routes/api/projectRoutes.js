const router = require("express").Router();

const {
	getAllProjects,
	getProject,
	createProject,
	updateProject,
	deleteProject,
	getAllFeatures,
	getFeature,
	createFeature,
	updateFeature,
	deleteFeature,
	getAllTasks,
	/*getTask,*/
	createTask,
	/*updateTask,
	deleteTask,*/
} = require("../../controllers/projectController");

// /api/projects
router.route("/").get(getAllProjects).post(createProject);

// /api/projects/:projectId
router
	.route("/:projectId")
	.get(getProject)
	.put(updateProject)
	.delete(deleteProject);

// /api/projects/:projectId/features
router.route("/:projectId/features").get(getAllFeatures).post(createFeature);

// /api/projects/:projectId/features/:featureId
router
	.route("/:projectId/features/:featureId")
	.get(getFeature)
	.put(updateFeature)
	.delete(deleteFeature);

// /api/projects/:projectId/features/:featureId/tasks
router
	.route("/:projectId/features/:featureId/tasks")
	.get(getAllTasks)
	.post(createTask);
/*
// /api/projects/:projectId/features/:featureId/tasks/:taskId
router
	.route("/:projectId/features/:featureId/tasks/:taskId")
	.get(getTask)
	.put(updateTask)
	.delete(deleteTask);
*/
module.exports = router;
