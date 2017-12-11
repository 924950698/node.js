//引入数据库模块
const mongoose = require('mongoose');

//以下是从官网mongoose中复制粘贴的内容，
//其中，服务器中的数据库地址：'mongodb://127.0.0.1:27017/job'，是可变的，其他是固定的。
//连接数据库 mongodb 写死 ；127.0.0.1 本地默认地址；  ：27017是数据库的端口号；  job是数据库
mongoose.connect('mongodb://127.0.0.1:27017/job', { useMongoClient: true });
//{ useMongoClient: true })          固定写法

mongoose.Promise = global.Promise;

module.exports = mongoose;