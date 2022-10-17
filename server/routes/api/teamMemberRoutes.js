const router = require("express").Router();

const {
	getAllTeamMembers,
	getTeamMember,
	createTeamMember,
	updateTeamMember,
	deleteTeamMember,
} = require("../../controllers/teamMemberController");

// /api/team
router.route("/").get(getAllTeamMembers).post(createTeamMember);

// /api/team/:teamMemberId
router
	.route("/:teamMemberId")
	.get(getTeamMember)
	.put(updateTeamMember)
	.delete(deleteTeamMember);

module.exports = router;
