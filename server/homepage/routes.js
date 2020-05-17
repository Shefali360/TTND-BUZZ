const user=require('./controller');
const router = require('express').Router();
router.get('/authToken/:code', user.handleAuthTokenRequest);

module.exports=router;