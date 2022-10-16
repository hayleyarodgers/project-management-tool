// Import team member model
const { TeamMember } = require("../../models");

module.exports = {
	// Get all team members
	async getAllTeamMembers(req, res) {
		const allTeamMembers = await TeamMember.find({});

		if (!allTeamMembers) {
			return res.status(400).json({ message: "No team members found." });
		}

		res.status(200).json(allTeamMembers);
	},

	// Get a team member by their id
	async getTeamMember({ params }, res) {
		const teamMember = await TeamMember.findOne({ _id: params.id });

		if (!teamMember) {
			return res
				.status(400)
				.json({ message: "No team member found with that id." });
		}

		res.status(200).json(teamMember);
	},

	// Create team member
	async createTeamMember({ body }, res) {
		const teamMember = await TeamMember.create(body);

		if (!teamMember) {
			return res.status(400).json({ message: "Unable to create team member." });
		}

		res.status(200).json(teamMember);
	},

	// Update team member
	async updateTeamMember({ body }, res) {
		const teamMember = await TeamMember.findOneAndUpdate(
			{ _id: body.id },
			{ $set: body },
			{ runValidators: true, new: true }
		);

		if (!teamMember) {
			return res.status(400).json({ message: "Unable to update team member." });
		}

		res.status(200).json(teamMember);
	},

	// Delete team member
	async deleteTeamMember({ body }, res) {
		const teamMember = await TeamMember.findOneAndDelete({ _id: body.id });

		if (!teamMember) {
			return res.status(400).json({ message: "Unable to delete team member." });
		}

		res.status(200).json({ message: "Team member deleted." });
	},
};