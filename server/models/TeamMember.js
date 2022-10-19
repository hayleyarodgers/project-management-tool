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
		role: {
			type: String,
			required: true,
		},
		efficiency: {
			type: Number,
			required: true,
		},
		manager: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	// Allow use of virtuals below
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// Initialise TeamMember model
const TeamMember = model("TeamMember", teamMemberSchema);

module.exports = TeamMember;
