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
router.get("/buzz", buzz.getAll);
router.post(
  "/buzz",
  midware.verifyTokenToGetUserData,
  imageUpload.array("images"),
  buzz.createBuzz
);
router.patch("/buzz/like/:id", buzz.updateLikes);
router.patch("/buzz/dislike/:id", buzz.updateDislikes);
module.exports=router;