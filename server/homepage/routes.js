const user=require('./controller');
const router = require('express').Router();

router.get('/authToken/:code', user.handleAuthTokenRequest);
router.post('/refreshAuthToken',user.handleRefreshAuthTokenRequest);
router.post('/logout',user.handleLogout)
router.use(user.handleUnknownRequests);
router.use(user.errorHandlingMiddleware);

module.exports=router;