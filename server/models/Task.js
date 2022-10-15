const { Schema, model } = require("mongoose");

// Helper function to format date
const dateFormat = require("../utils/dateFormat");

// Schema to create the task field's subdocument schema in the Feature model
const taskSchema = new Schema(
	{
		taskName: {
			type: String,
			required: "Your task needs a name.",
			trim: true,
		},
		taskAcceptanceCriteria: {
			type: String,
			required: "Your task needs acceptance criteria.",
			minlength: 1,
			maxlength: 280,
			trim: true,
		},
		taskAssignee: {
			type: Schema.Types.ObjectId,
			ref: "teamMember",
		},
		taskTimeEstimate: {
			type: Number,
			required: true,
		},
		taskTimeActual: {
			type: Number,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
		finishedAt: {
			type: Date,
		},
	},
	// Allow use of virtuals below
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// Create a virtual property "taskEfficiency" that compares time task took compared to task
taskSchema.virtual("taskEfficiency").get(function () {
	return this.taskTimeActual / this.taskTimeEstimate;
});

const Task = model("task", taskSchema);

module.exports = Task;
