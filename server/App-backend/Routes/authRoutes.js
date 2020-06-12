const auth = require("../../App-backend/controller/authController");
const router = require("express").Router();
router.get("/authToken/:code", auth.handleAuthTokenRequest);
router.post("/logout", auth.handleLogout);


module.exports = router;
