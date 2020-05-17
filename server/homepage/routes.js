const user=require('./controller');
const router = require('express').Router();
router.get('/authToken', user.handleAuthTokenRequest);