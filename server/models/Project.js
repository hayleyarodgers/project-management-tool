const { Schema, model } = require("mongoose");
const featureSchema = require("./Feature");

// Helper function to format date
const dateFormat = require("../utils/dateFormat");

// Schema to create Project model
const projectSchema = new Schema(
	{
		projectName: {
			type: String,
			required: "Your project needs a name.",
			unique: true,
			trim: true,
		},
		projectDescription: {
			type: String,
			required: "Your project needs a description.",
			minlength: 1,
			maxlength: 280,
			trim: true,
		},
		projectUserStory: {
			type: String,
			required: "Your project needs a user story.",
			minlength: 1,
			maxlength: 280,
			trim: true,
		},
		projectTeamMembers: [
			{
				type: Schema.Types.ObjectId,
				ref: "TeamMember",
			},
		],
		projectManager: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
		// Array of feature subdocuments
		features: [featureSchema],
	},
	// Allow use of virtuals below
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// Create a virtual property "featureCount" that gets the number of features a project has
projectSchema.virtual("featureCount").get(function () {
	return this.features.length;
});

// Create a virtual property "projectRawTimeEstimate" that gets the total estimated time for of all this project's features
projectSchema.virtual("projectRawTimeEstimate").get(function () {
	const featureRawTimeEstimateArray = [0];

	for (let i = 0; i < this.features.length; i++) {
		featureRawTimeEstimateArray.push(this.features[i].featureRawTimeEstimate);
	}

	const getSum = (total, num) => {
		return total + num;
	};

	return featureRawTimeEstimateArray.reduce(getSum);
});

const Project = model("Project", projectSchema);

module.exports = Project;
