const router = require("express").Router();

const {
	getSingleUserManager,
	signupUserManager,
	loginUserManager,
} = require("../../../controllers/manager/userManagerController");

// Import authorisation middleware to be used anywhere we need to send a token for verification of user
const { authMiddleware } = require("../../../utils/auth");

// /api/manager/users
router.route("/").post(signupUserManager);

// /api/manager/users/login
router.route("/login").post(loginUserManager);

// /api/manager/users/me
router.route("/me").get(authMiddleware, getSingleUserManager);

module.exports = router;
