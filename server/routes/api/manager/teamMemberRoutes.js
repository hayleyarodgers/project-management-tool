const router = require("express").Router();

const {
	getAllTeamMembers,
	getSingleTeamMember,
	createTeamMember,
	updateTeamMember,
	deleteTeamMember,
} = require("../../../controllers/manager/teamMemberController");

// /api/manager/team
router.route("/").get(getAllTeamMembers).post(createTeamMember);

// /api/manager/team/:teamMemberId
router
	.route("/:teamMemberId")
	.get(getSingleTeamMember)
	.put(updateTeamMember)
	.delete(deleteTeamMember);

module.exports = router;
