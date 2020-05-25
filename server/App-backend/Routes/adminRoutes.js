const admin = require("../../App-backend/controller/adminController");
const midware = require("../midwares/midwares");
const router = require("express").Router();


router.post("/admin", midware.verifyTokenToGetUserData, admin.createAdmin);
router.get("/admin", midware.verifyTokenToGetUserData, admin.getAdmin);
router.delete("/admin/:id", admin.delete);
module.exports = router;