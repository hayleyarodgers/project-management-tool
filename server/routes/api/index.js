const router = require("express").Router();

const userRoutes = require("./userRoutes");
const teamMemberRoutes = require("./teamMemberRoutes");
const projectRoutes = require("./projectRoutes");

router.use("/users", userRoutes);
router.use("/team", teamMemberRoutes);
router.use("/projects", projectRoutes);

module.exports = router;
