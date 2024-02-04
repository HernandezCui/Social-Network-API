const router = require("express").Router();
const thoughtsRoutes = require("./thought-routes");
const userRoutes = require("./user-routes");

router.use("/thought", thoughtsRoutes);
router.use("/users", userRoutes);

module.exports = router;