const auth = require("../../appBackend/controller/authController");
const router = require("express").Router();
router.get("/authToken/:code", auth.handleAuthTokenRequest);
router.post("/refreshAuthToken", auth.handleRefreshAuthTokenRequest);
router.post("/logout", auth.handleLogout);


module.exports = router;
