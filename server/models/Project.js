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
			type: String,
			required: true,
			trim: true,
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

// Create a virtual property "projectTimeEstimate" that gets the total estimated time for of all this project's features
projectSchema.virtual("projectTimeEstimate").get(function () {
	const featureTimeEstimateArray = [0];

	for (let i = 0; i < this.features.length; i++) {
		featureTimeEstimateArray.push(this.features[i].featureTimeEstimate);
	}

	const getSum = (total, num) => {
		return total + num;
	};

	return featureTimeEstimateArray.reduce(getSum);
});

const Project = model("Project", projectSchema);

module.exports = Project;
