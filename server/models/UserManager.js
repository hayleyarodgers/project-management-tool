const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Schema to create UserManager model
const userManagerSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			// Use regex to validate email
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Please use a valid email address.",
			],
		},
		password: {
			type: String,
			required: true,
		},
		// Array of ids of projects created by a user
		projects: [
			{
				type: Schema.Types.ObjectId,
				ref: "Project",
			},
		],
		// Array of ids of team members created by a user
		teamMembers: [
			{
				type: Schema.Types.ObjectId,
				ref: "TeamMember",
			},
		],
	},
	// Allow use of virtuals below
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// Hash user's password
userManagerSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// Custom method to compare and validate password when user logs in
userManagerSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

// Create a virtual property "projectCount" that gets the number of projects a user has
userManagerSchema.virtual("projectCount").get(function () {
	return this.projects.length;
});

// Create a virtual property "teamCount" that gets the number of people in a user's team
userManagerSchema.virtual("teamCount").get(function () {
	return this.teamMembers.length;
});

// Initialise UserProjectManager model
const UserManager = model("UserManager", userManagerSchema);

module.exports = UserManager;