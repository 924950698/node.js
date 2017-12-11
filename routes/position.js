const express = require('express');
const router = express.Router();
//引入控制层的position方法 
const PositionController = require('../controller/position.js');

// 都是回调函数，在controller/user.js最下方是导出中
// '/add' 是url中的最后一条路径
router.get('/add', PositionController.add);
router.get('/tableList', PositionController.getTableList);
router.get('/getItem', PositionController.getItem);
router.get('/delete', PositionController.deleteItem);//deleteItem:删除一项
router.get('/upData', PositionController.upData);

module.exports = router;