const { Schema, model } = require("mongoose");

// Schema to create TeamMember model
const teamMemberSchema = new Schema(
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
		role: {
			type: String,
			required: true,
		},
		efficiency: {
			type: Number,
			required: true,
		},
		// Array of ids of features assigned to team member
		features: [
			{
				type: Schema.Types.ObjectId,
				ref: "Feature",
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

// Create a virtual property "featureCount" that gets the number of features a team member has
teamMemberSchema.virtual("featureCount").get(function () {
	return this.features.length;
});

// Initialise TeamMember model
const TeamMember = model("TeamMember", teamMemberSchema);

module.exports = TeamMember;
