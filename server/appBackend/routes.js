const auth=require('./authController');
const buzz=require('./buzzController');
const complaint=require('./complaintController');
const midware=require('./midwares');
const router = require('express').Router();
const multer  = require('multer');
const upload = multer({ storage:midware.storage, limits:{
    fileSize:1024*1024*5
},
fileFilter:midware.fileFilter});


router.get('/authToken/:code', auth.handleAuthTokenRequest);
router.post('/refreshAuthToken',auth.handleRefreshAuthTokenRequest);
router.post('/logout',auth.handleLogout);
router.get('/buzz', buzz.getAll);
router.post('/buzz',midware.verifyTokenToGetUserData,upload.array('images'),buzz.createBuzz);
router.patch('/buzz/like/:id',buzz.updateLikes);
router.patch('/buzz/dislike/:id',buzz.updateDislikes);
// router.post('/complaint',complaint.createComplaint)
router.use(auth.handleUnknownRequests);
router.use(midware.errorHandlingMiddleware);

module.exports=router;