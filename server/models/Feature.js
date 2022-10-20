const { Schema } = require("mongoose");
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
		// Array of task subdocuments
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

// Create a virtual property "featureRawTimeEstimate" that gets the total estimated time for of all this feature's tasks
featureSchema.virtual("featureRawTimeEstimate").get(function () {
	const taskRawTimeEstimateArray = [0];

	for (let i = 0; i < this.tasks.length; i++) {
		taskRawTimeEstimateArray.push(this.tasks[i].taskTimeEstimate);
	}

	const getSum = (total, num) => {
		return total + num;
	};

	return taskRawTimeEstimateArray.reduce(getSum);
});

module.exports = featureSchema;
