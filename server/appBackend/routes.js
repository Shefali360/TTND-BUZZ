const auth=require('./authController');
const buzz=require('./buzzController');
const midware=require('./midwares');
const router = require('express').Router();

router.get('/authToken/:code', auth.handleAuthTokenRequest);
router.post('/refreshAuthToken',auth.handleRefreshAuthTokenRequest);
router.post('/logout',auth.handleLogout);
router.post('/buzz',midware.verifyTokenToGetUserData,buzz.createBuzz);
router.use(auth.handleUnknownRequests);
router.use(midware.errorHandlingMiddleware);

module.exports=router;