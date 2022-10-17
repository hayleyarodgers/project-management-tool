const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Schema to create User model
const userSchema = new Schema(
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
		// Array of ids of people on a user's team
		teamMembers: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		// For multi-user application in future development
		role: {
			type: Schema.Types.ObjectId,
			ref: "Role",
		},
	},
	// Allow use of virtuals below
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// Hash user's password
userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

// Custom method to compare and validate password when user logs in
userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

// Create a virtual property "projectCount" that gets the number of projects a user has
userSchema.virtual("projectCount").get(function () {
	return this.projects.length;
});

// Create a virtual property "teamCount" that gets the number of people in a user's team
userSchema.virtual("teamCount").get(function () {
	return this.teamMembers.length;
});

// Initialise User model
const User = model("User", userSchema);

module.exports = User;
