const router = require("express").Router();

const {
	getAllTeamMembers,
	getTeamMember,
	createTeamMember,
	updateTeamMember,
	deleteTeamMember,
} = require("../../../controllers/manager/teamMemberController");

// /api/manager/team
router.route("/").get(getAllTeamMembers).post(createTeamMember);

// /api/manager/team/:teamMemberId
router
	.route("/:teamMemberId")
	.get(getTeamMember)
	.put(updateTeamMember)
	.delete(deleteTeamMember);

module.exports = router;
