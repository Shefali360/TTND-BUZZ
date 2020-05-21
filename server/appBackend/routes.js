const auth = require("./authController");
const buzz = require("./buzzController");
const complaint = require("./complaintController");
const admin = require("./adminController");
const midware = require("./midwares");
const router = require("express").Router();
const multer = require("multer");
const imageUpload = multer({
  storage: midware.imageStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: midware.imageFileFilter,
});

const fileUpload = multer({
  storage: midware.fileStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
router.get("/authToken/:code", auth.handleAuthTokenRequest);
router.post("/refreshAuthToken", auth.handleRefreshAuthTokenRequest);
router.post("/logout", auth.handleLogout);
router.get("/buzz", buzz.getAll);
router.post(
  "/buzz",
  midware.verifyTokenToGetUserData,
  imageUpload.array("images"),
  buzz.createBuzz
);
router.patch("/buzz/like/:id", buzz.updateLikes);
router.patch("/buzz/dislike/:id", buzz.updateDislikes);
router.post(
  "/complaint",
  midware.verifyTokenToGetUserData,
  fileUpload.array("files"),
  complaint.createComplaint
);
router.get(
  "/complaint/all",
  midware.verifyTokenToGetUserData,
  midware.checkAdminPrivileges,
  complaint.getAllComplaints
);
router.get(
  "/complaint",
  midware.verifyTokenToGetUserData,
  complaint.getComplaintsByUserEmail
);
router.patch(
 "/complaint/:id",
 midware.verifyTokenToGetUserData,
 midware.checkAdminPrivileges,
complaint.updateComplaintStatusById
);
router.post("/admin", midware.verifyTokenToGetUserData, admin.createAdmin);
router.get("/admin", midware.verifyTokenToGetUserData, admin.getAdmin);
router.delete("/admin/:id", admin.delete);
router.use(auth.handleUnknownRequests);
router.use(midware.errorHandlingMiddleware);

module.exports = router;
