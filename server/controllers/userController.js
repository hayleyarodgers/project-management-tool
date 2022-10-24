// Import user model
const { User } = require("../models");
// Import sign token function from auth
const { signToken } = require("../utils/auth");

module.exports = {
	// Get a user by their id
	async getUser({ user = null, params }, res) {
		try {
			const foundUser = await User.findOne({
				$or: [
					{ _id: user ? user._id : params.id },
					{ username: params.username },
				],
			})
				.populate("teamMembers")
				.populate("projects");

			if (!foundUser) {
				return res.status(400).json({ message: "No user with that id." });
			}

			res.status(200).json(foundUser);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Upon sign up, create a user, sign a token and send it back to client/src/components/SignUpForm.js
	async signupUser({ body }, res) {
		try {
			const user = await User.create(body);

			if (!user) {
				return res.status(400).json({ message: "Unable to create new user." });
			}

			const token = signToken(user);
			res.status(200).json({ token, user });
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Upon log in, log in the user based on username, sign a token and send it back to client/src/components/LoginForm.js
	async loginUser({ body }, res) {
		try {
			const user = await User.findOne({ username: body.username });

			if (!user) {
				return res.status(400).json({
					message: "Unable to find user with this username.",
				});
			}

			// Check password
			const correctPw = await user.isCorrectPassword(body.password);

			if (!correctPw) {
				return res.status(400).json({ message: "Wrong password." });
			}

			const token = signToken(user);
			res.status(200).json({ token, user });
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Get all of a manager's team members
	async getAllManagersTeamMembers({ user = null, params }, res) {
		try {
			const manager = await User.findOne({
				$or: [
					{ _id: user ? user._id : params.id },
					{ username: params.username },
				],
			}).populate("teamMembers");

			const managersTeamMembers = manager.teamMembers;

			if (!managersTeamMembers) {
				return res.status(400).json({
					message: "No team members found associated with that manager.",
				});
			}

			res.status(200).json(managersTeamMembers);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Get all of a manager's projects
	async getAllManagersProjects({ user = null, params }, res) {
		try {
			const manager = await User.findOne({
				$or: [
					{ _id: user ? user._id : params.id },
					{ username: params.username },
				],
			});

			const managersProjects = manager.projects;

			if (!managersProjects) {
				return res
					.status(400)
					.json({ message: "No projects found associated with that manager." });
			}

			res.status(200).json(managersProjects);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},
};
