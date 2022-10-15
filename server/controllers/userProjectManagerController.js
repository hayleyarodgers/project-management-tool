// Import project manager user model
const { UserProjectManager } = require("../models");
// Import sign token function from auth
const { signToken } = require("../utils/auth");

module.exports = {
	// Get a project manager user by their id
	async getSingleUserProjectManager({ params }, res) {
		const user = await UserProjectManager.findOne({ _id: params.userId });

		if (!user) {
			return res.status(400).json({ message: "No user with that id." });
		}

		res.json(user);
	},

	// Upon sign up, create a project manager user, sign a token and send it back to client/src/components/SignUpForm.js
	async signupUserProjectManager({ body }, res) {
		const user = await UserProjectManager.create(body);

		if (!user) {
			return res
				.status(400)
				.json({ message: "Unable to create new project manager user." });
		}

		const token = signToken(user);
		res.json({ token, user });
	},

	// Upon log in, log in the project manager user based on username, sign a token and send it back to client/src/components/LoginForm.js)
	async loginUserProjectManager({ body }, res) {
		const user = await UserProjectManager.findOne({ username: body.username });

		if (!user) {
			return res.status(400).json({
				message: "Unable to find project manager user with this username.",
			});
		}

		// Check password
		const correctPw = await UserProjectManager.isCorrectPassword(body.password);

		if (!correctPw) {
			return res.status(400).json({ message: "Wrong password." });
		}

		const token = signToken(user);
		res.json({ token, user });
	},
};
