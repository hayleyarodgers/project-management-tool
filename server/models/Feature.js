const { Schema, Types } = require("mongoose");
const taskSchema = require("./Task");

// Helper function to format date
const dateFormat = require("../utils/dateFormat");

// Schema to create the feature field's subdocument schema in the Project model
const featureSchema = new Schema(
	{
		featureId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
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
			default: true,
		},
		featureAssignee: {
			type: Schema.Types.ObjectId,
			ref: "TeamMember",
		},
		featureCreatedAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
		featureFinishedAt: {
			type: Date,
			get: (timestamp) => dateFormat(timestamp),
		},
		featureTimeEstimate: {
			type: Number,
		},
		featureTimeActual: {
			type: Number,
		},
		// Array of task subdocuments
		tasks: [taskSchema],
	},
	// Allow use of virtuals below
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// Create a virtual property "taskCount" that gets the number of tasks a feature has
featureSchema.virtual("taskCount").get(function () {
	return this.tasks.length;
});

module.exports = featureSchema;
