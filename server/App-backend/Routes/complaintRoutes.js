const complaint = require("../../appBackend/controller/complaintController");
const midware = require("../midwares/midwares");
const router = require("express").Router();
const multer = require("multer");
const fileUpload = multer({
  storage: midware.fileStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});


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
  module.exports = router;