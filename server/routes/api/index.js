const router = require("express").Router();
const managerRoutes = require("./manager");
router.use("/manager", managerRoutes);

module.exports = router;
