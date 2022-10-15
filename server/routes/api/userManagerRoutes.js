const router = require("express").Router();

const {
	getSingleUserManager,
	signupUserManager,
	loginUserManager,
} = require("../../controllers/userManagerController");

// Import authorisation middleware to be used anywhere we need to send a token for verification of user
const { authMiddleware } = require("../../utils/auth");

// /api/users/manager
router.route("/").post(signupUserManager);

// /api/users/manager/login
router.route("/login").post(loginUserManager);

// /api/users/manager/me
router.route("/me").get(authMiddleware, getSingleUserManager);

module.exports = router;
