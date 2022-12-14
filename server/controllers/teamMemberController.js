// Import team member model
const { TeamMember, User } = require("../models");

module.exports = {
	// Get all team members
	async getAllTeamMembers(req, res) {
		try {
			const allTeamMembers = await TeamMember.find({});

			if (!allTeamMembers) {
				return res.status(400).json({ message: "No team members found." });
			}

			res.status(200).json(allTeamMembers);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Get a team member by their id
	async getTeamMember({ params }, res) {
		try {
			const teamMember = await TeamMember.findOne({ _id: params.teamMemberId });

			if (!teamMember) {
				return res
					.status(400)
					.json({ message: "No team member found with that id." });
			}

			res.status(200).json(teamMember);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Create team member
	async createTeamMember({ body }, res) {
		try {
			const teamMember = await TeamMember.create(body);

			if (!teamMember) {
				return res
					.status(400)
					.json({ message: "Unable to create team member." });
			}

			// Add team member to the team of the person creating this user (manager)
			const manager = await User.findOneAndUpdate(
				{ _id: body.manager },
				{ $addToSet: { teamMembers: teamMember._id } },
				{ new: true }
			);

			if (!manager) {
				return res
					.status(400)
					.json({ message: "Team member added but not linked to manager." });
			}

			res.status(200).json(teamMember);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Update team member
	async updateTeamMember({ body, params }, res) {
		try {
			const teamMember = await TeamMember.findOneAndUpdate(
				{ _id: params.teamMemberId },
				{ $set: body },
				{ runValidators: true, new: true }
			);

			if (!teamMember) {
				return res
					.status(400)
					.json({ message: "Unable to update team member." });
			}

			res.status(200).json(teamMember);
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},

	// Delete team member
	async deleteTeamMember({ params }, res) {
		try {
			const teamMember = await TeamMember.findOneAndDelete({
				_id: params.teamMemberId,
			});

			if (!teamMember) {
				return res
					.status(400)
					.json({ message: "Unable to delete team member." });
			}

			res.status(200).json({ message: "Team member deleted." });
		} catch (err) {
			console.error(err);
			res.status(500);
		}
	},
};
