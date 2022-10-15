// Import manager user model
const { UserManager } = require("../../models");
// Import sign token function from auth
const { signToken } = require("../../utils/auth");

module.exports = {
	// Get a manager user by their id
	async getUserManager({ params }, res) {
		const user = await UserManager.findOne({ _id: params.userId });

		if (!user) {
			return res.status(400).json({ message: "No user with that id." });
		}

		res.status(200).json(user);
	},

	// Upon sign up, create a manager user, sign a token and send it back to client/src/components/SignUpForm.js
	async signupUserManager({ body }, res) {
		const user = await UserManager.create(body);

		if (!user) {
			return res
				.status(400)
				.json({ message: "Unable to create new manager user." });
		}

		const token = signToken(user);
		res.status(200).json({ token, user });
	},

	// Upon log in, log in the manager user based on username, sign a token and send it back to client/src/components/LoginForm.js)
	async loginUserManager({ body }, res) {
		const user = await UserManager.findOne({ username: body.username });

		if (!user) {
			return res.status(400).json({
				message: "Unable to find manager user with this username.",
			});
		}

		// Check password
		const correctPw = await UserManager.isCorrectPassword(body.password);

		if (!correctPw) {
			return res.status(400).json({ message: "Wrong password." });
		}

		const token = signToken(user);
		res.status(200).json({ token, user });
	},
};
