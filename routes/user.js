const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.js');

// 都是回调函数，在controller/user.js最下方是导出中
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/isLogin', UserController.isLogin);
router.get('/logout', UserController.logout);

module.exports = router;