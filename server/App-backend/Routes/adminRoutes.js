const admin = require("../../App-backend/controller/adminController");
const midware = require("../midwares/midwares");
const router = require("express").Router();

router.post("/", midware.verifyTokenToGetUserData, admin.createAdmin);
router.get("/",midware.verifyTokenToGetUserData, admin.getAdmin);
router.delete("/:id", admin.delete);
module.exports = router;

