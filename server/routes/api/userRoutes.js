const router = require("express").Router();

const {
	getUser,
	signupUser,
	loginUser,
	getAllManagersTeamMembers,
	getAllManagersProjects,
} = require("../../controllers/userController");

// Import authorisation middleware to be used anywhere we need to send a token for verification of user
const { authMiddleware } = require("../../utils/auth");

// /api/users
router.route("/").post(signupUser);

// /api/users/login
router.route("/login").post(loginUser);

// /api/users/me
router.route("/me").get(authMiddleware, getUser);

// /api/users/myteam
router.route("/myteam").get(authMiddleware, getAllManagersTeamMembers);

// /api/users/myprojects
router.route("/myprojects").get(authMiddleware, getAllManagersProjects);

module.exports = router;
