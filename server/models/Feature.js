const { Schema, model } = require("mongoose");
const taskSchema = require("./Task");

// Helper function to format date
const dateFormat = require("../utils/dateFormat");

// Schema to create the feature field's subdocument schema in the Project model
const featureSchema = new Schema(
	{
		featureName: {
			type: String,
			required: "Your feature needs a name.",
			trim: true,
		},
		featureDescription: {
			type: String,
			required: "Your feature needs a description.",
			minlength: 1,
			maxlength: 280,
			trim: true,
		},
		featureMustHave: {
			type: Boolean,
			required: true,
		},
		featureAssignee: {
			type: Schema.Types.ObjectId,
			ref: "TeamMember",
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
		// Array of nested task documents
		tasks: [taskSchema],
	},
	// Allow use of virtuals below
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// Create a virtual property "taskCount" that gets the number of tasks a feature has
featureSchema.virtual("taskCount").get(function () {
	return this.tasks.length;
});

const Feature = model("Feature", featureSchema);

module.exports = Feature;
