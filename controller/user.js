//引入增加用户，查找用户的两个功能
const UserModel = require('../model/user.js');
//引入加密模块
const crypto = require('crypto');

//注册功能
const register = (req, res) => {
	const {username, password} = req.body;

	UserModel.findUser({username: username}, (userInfo) => {
		if (userInfo) {
			res.json({
				"ret": true,
				"data": {
					register: false
				}
			})
		}else {
			// 对密码进行加密
			const hash = crypto.createHash('sha256');
			hash.update(password);

			UserModel.addUser(username, hash.digest('hex'), () => {
				res.json({
					"ret": true,
					"data": {
						register: true
					}
				})
			});
		}
	})
}

//登录功能
const login = (req, res) => {
	const {username, password} = req.body;

	const hash = crypto.createHash('sha256');
	hash.update(password);

	UserModel.findUser({
		username: username,
		password: hash.digest('hex')
	}, (userInfo) => {
		if (userInfo) {
			req.session.username = username;
			res.json({
				ret: true,
				data: {
					login: true
				}
			})
		}else {
			res.json({
				ret: true,
				data: {
					login: false
				}
			})
		}
	})
}

//二次登录
const isLogin = (req, res) => {
	if (req.session.username) {
		res.json({
			ret: true,
			data: {
				username: req.session.username,
				isLogin: true
			}
		})
	}else {
		res.json({
			ret: true,
			data: {
				isLogin: false
			}
		})
	}
}

//退出功能
const logout = (req, res) => {
	req.session = null;
	res.json({
		ret: true,
		data: {
			logout: true
		}
	})
}

//导出功能
module.exports = {
	register,
	login,
	isLogin,
	logout
}