//引入增加用户，查找用户的两个功能
const PositionModel = require('../model/position.js');
//???
const add = ( req, res) => {
	const {name, company, address, salary} = req.query;
//调用这个方法，
	PositionModel.addPosition(name, company, salary, address, () => {
		res.json({
			ret: true,
			data: {
				addition: true
			}
		})
	})
}

const getTableList = (req, res) => {
	//req.query接收的是datalist的参数
	//这两句话的意思是：如果传参就执行参数，如果没有就执行后面的语句
	var page = req.query.page ? parseInt(req.query.page, 10) : 1;
	//，10 是要转换成10进制，不然在某些浏览器上会有坑
	const pageNum = req.query.pageNum ? parseInt(req.query.pageNum, 10) : 20;

//分页代码---获取总页数
	PositionModel.getTotalPages(pageNum, (totalPage) => {
		//当前页数内容	
		PositionModel.getTableList(page, pageNum, (tableList) => {
			//以json格式，返回数据
			res.json({
				ret: true,//表示请求成功
				//data:返回的参数
				data: {
					tableList: tableList, //下一步，去moudle中创建getTableList方法
					totalPage: totalPage
				}
			})
	    })
	})
}

//查找项
const getItem = (req, res) => {
	const id = req.query.id;
	PositionModel.getItem(id, (result) => {
		res.json({
			ret:true,
			data:{
				result: result
			}
		})
	})
}

//修改项
const upData = (req, res) => {

	const {id, name, company,salary, address} = req.query;
	console.log(req.query.id);
	PositionModel.upData(id, name, company,salary, address, (result) => {
		res.json({
			ret:true,
			data: {
				updata: result ? true: false
			}
		})
	})
}



//require请求—— response返回
const deleteItem = (req, res) => {
	PositionModel.deleteItem(req.query.id, (result) => {
		
		res.json({
			ret:true,
			data:{
				delete: result
			}
			
		})
	})
}



//导出功能
module.exports = {
	add,
	getTableList,
	deleteItem,
	getItem,
	upData
}