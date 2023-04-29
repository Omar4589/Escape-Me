const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const privateRoutes = require("./privateRoutes");

router.use("/", homeRoutes);
router.use("/", privateRoutes);
router.use("/api", apiRoutes);

module.exports = router;
