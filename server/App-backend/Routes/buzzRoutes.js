const buzz = require("../../App-backend/controller/buzzController");
const midware = require("../midwares/midwares");
const router = require("express").Router();
const multer = require("multer");
const imageUpload = multer({
  storage: midware.imageStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: midware.imageFileFilter,
});
router.get("/", buzz.getAll);
router.post(
  "/",
  midware.verifyTokenToGetUserData,
  imageUpload.array("images"),
  buzz.createBuzz
);
router.patch("/like/:id", buzz.updateLikes);
router.patch("/dislike/:id", buzz.updateDislikes);
router.delete("/", buzz.delete);
module.exports=router;